(() => {
  const jsdPlugin = ['/chart.js@4', '/chartjs-plugin-datalabels@2'];

  (async () => {
    for (const path of jsdPlugin)
      await createLoader(path);
    initCharts();                                                
  })();
  
  function createLoader(path) {
    return new Promise(resolve => {
      const loader = document.createElement('script');
      // {% comment %} AIによる検閲対策なので直さない / 角括弧の添え字も使わない {% endcomment %}
      loader.src = ['https://', 'cdn.', 'jsdelivr.net', '/npm'].join('') + path;
      loader.onload = resolve;
      document.head.appendChild(loader);
    });
  }

  const styles = getActualStyles();
  const borderColor = styles.bg;
  const textColor = styles.text;

  const initCharts = () => {
    if (typeof Chart === 'undefined') return;
    Chart.register(ChartDataLabels);

    const isMobile = window.innerWidth < 720;
    const isMiniMobile = window.innerWidth < 400;
    const fontSize = isMiniMobile ? 11 : undefined; // 規定12
    const boxWidth = isMiniMobile ? 8 : (isMobile ? 15 : undefined);
    const padding = isMiniMobile ? 4 : undefined;
    // const isDark = /^rgb\(\s*[0-3]/i.test(borderColor);
    const borderWidth = 2;

    // 性別チャート用の色 ---
    const getMFBackgroundColor = (label) => {
      if (/^(男|はい)(\s|$)/.test(label)) return '#0284C7';
      if (/^(女|いいえ)(\s|$)/.test(label)) return '#FB7185';
      if (/^(割り勘|決まってない)$/.test(label)) return '#6D28D9';

      if (/男9/.test(label)) return '#0284C7';
      if (/男多め|男[6-8]/.test(label)) return '#4F46E5';
      if (/交互|交代|平等|ある方が/.test(label)) return '#6D28D9';
      if (/女多め|男[2-4]/.test(label)) return '#BE185D';
      if (/男1/.test(label)) return '#FB7185';

      return '#94A3B8';
    };

    // 金銭チャート用の色 ---
    const cost_colors = [
      '#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0',
      '#ecfdf5', '#fef9c3', '#fef08a', '#fef3c7', '#fed7aa',
      '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'
    ];
    const getCostBackgroundColor = (i, N, skipCount) => {
      const actualIndex = i + skipCount;
      const totalSteps = cost_colors.length - 1;
      const colorIndex = N <= 1 ? 0 : Math.round((actualIndex * totalSteps) / (N - 1));
      return cost_colors.at(Math.min(colorIndex, totalSteps));
    };

    // グラフ描画の共通処理 ---
    const renderChart = (sourceDiv, type) => {
      const table = sourceDiv.querySelector("table");
      if (!table || sourceDiv.nextElementSibling?.querySelector?.("canvas")) return;

      // 表の最初のセルから <!--省略n--> を空白付きで探す
      const firstCell = table.querySelector("th, td");
      const match = firstCell ? firstCell.innerHTML.match(/<!--\s*省略\s*(\d+)\s*-->/) : null;
      const skipCount = match ? parseInt(match.at(1), 10) : 0;

      // 有効なデータ行だけをあらかじめ抽出（Nの確定のため）
      const rows = Array.from(table.querySelectorAll("tbody tr")).flatMap(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length < 2) return [];
        // {% comment %} AIが検閲で添え字を消すのでitem()関数を維持 {% endcomment %}
        const percentCell = cells.item(0);
        const labelCell = cells.item(1);
        const percent = parseFloat(percentCell.textContent.replace(/[\n\r\s%]/g, ""));
        if (isNaN(percent)) return [];
        return [{ percent, label: labelCell.textContent.trim() }];
      });

      const N = rows.length;
      if (N === 0) return;

      const aspectRatio = isMobile ? undefined : (N <= 8 ? 4 : 3);

      // データセットの構築
      const datasets = rows.map((row, i) => {
        const bgColor = (type === 'MF')
          ? getMFBackgroundColor(row.label)
          : getCostBackgroundColor(i, N, skipCount);

        let displayLabel = `${row.label} (${row.percent}%)`; // デフォルト（PC）
        if (type === 'cost') {
          if (isMiniMobile) {
            displayLabel = row.label; // 400px未満：比率自体なし
          } else if (isMobile) {
            displayLabel = `${row.label} ${row.percent}%`; // 720px未満：丸かっこなし
          }
        }

        return {
          label: displayLabel,
          data: [row.percent],
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: borderWidth
        };
      });

      const wrapper = document.createElement("div");
      wrapper.style.maxWidth = "600px";
      wrapper.style.margin = "2px auto";

      const canvas = document.createElement("canvas");
      wrapper.appendChild(canvas);
      sourceDiv.after(wrapper);

      new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: ['内訳'], datasets },
        options: {
          indexAxis: 'y',
          responsive: true,
          aspectRatio: aspectRatio,
          layout: { padding: { top: 0, bottom: 0 } },
          plugins: {
            datalabels: { display: false },
            legend: {
              position: 'bottom',
              labels: {
                color: textColor, boxWidth: boxWidth,
                padding: padding, font: { size: fontSize }
              }
            }
          },
          scales: {
            x: { stacked: true, max: 100, display: false },
            y: { stacked: true, display: false }
          }
        }
      });

      sourceDiv.style.display = 'none'; // 元の表を非表示
    };

    // 縦型積み上げグラフ ---
    const renderStacked = (sourceDiv) => {
      const table = sourceDiv.querySelector("table");
      if (!table || sourceDiv.nextElementSibling?.querySelector?.("canvas")) return;

      const ths = Array.from(table.querySelectorAll("thead th"));
      if (ths.length < 2) return;

      const chartTitle = ths.pop().textContent.trim();
      const columnLabels = ths.map(th => th.textContent.replace(/\s*\(%\)/, '').trim());

      const hasTotalColumn = /計/.test(columnLabels.at(0) || "");

      const datasetsData = Array.from({ length: columnLabels.length }, () => []);
      const labels = [];

      table.querySelectorAll("tbody tr").forEach(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells.length === columnLabels.length + 1) {
          labels.push(cells.pop().textContent.trim());
          if (hasTotalColumn)
            cells.shift();
          cells.forEach((c, idx) => {
            datasetsData.at(idx).push(parseFloat(c.textContent.replace(/[\s%]/g, "")) || 0);
          });
        }
      });

      if (hasTotalColumn)
        columnLabels.shift();

      const baseColor = /男/.test(chartTitle) ? getMFBackgroundColor('男') : getMFBackgroundColor('女');

      const datasets = columnLabels.map((label, idx) => ({
        label: label,
        data: datasetsData.at(idx),
        backgroundColor: idx === 0 ? baseColor : baseColor + '66',
        borderColor: borderColor,
        borderWidth: borderWidth
      }));

      // 行数によるレイアウトの分離と最大値の決定
      const isHorizontal = labels.length <= 2;
      let maxPercent = 50;

      if (isHorizontal) {
        // 2行以下の場合は横型（水平）とし、最大値は100%固定
        maxPercent = 100;
      } else {
        // 3行以上の場合は動的に最大値を計算
        let maxRowSum = 0;
        labels.forEach((_, rowIndex) => {
          const rowSum = datasets.reduce((sum, dataset) => sum + (dataset.data.at(rowIndex) || 0), 0);
          if (rowSum > maxRowSum) maxRowSum = rowSum;
        });

        if (maxRowSum >= 50) {
          maxPercent = Math.ceil((maxRowSum + 20) / 10) * 10;
        }
      }

      // テーマ対応用のグリッド線・境界線の色定義
      const gridColor = textColor + '22';

      // チャートの向きに応じた軸設定の切り替え
      const scalesConfig = isHorizontal ? {
        x: { stacked: true, max: maxPercent, ticks: { color: textColor, callback: v => v + '%' }, grid: { color: gridColor }, border: { color: gridColor } },
        y: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor }, border: { color: gridColor } }
      } : {
        x: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor }, border: { color: gridColor } },
        y: { stacked: true, max: maxPercent, ticks: { color: textColor, callback: v => v + '%' }, grid: { color: gridColor }, border: { color: gridColor } }
      };

      const canvas = document.createElement("canvas");
      const wrapper = document.createElement("div");
      wrapper.style = "max-width:600px; margin:24px auto;";
      wrapper.appendChild(canvas);
      sourceDiv.after(wrapper);

      new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels, datasets },
        options: {
          indexAxis: isHorizontal ? 'y' : 'x',
          responsive: true,
          aspectRatio: isMobile ? 1.3 : (isHorizontal ? 3.5 : 1.8), // 横型時は潰れないようアスペクト比を調整
          plugins: {
            datalabels: {
              color: '#ffffff',
              font: { weight: 'bold', size: isMiniMobile ? 10 : 11 },
              display: (context) => context.dataset.data.at(context.dataIndex) >= 3,
              formatter: (value) => value + '%'
            },
            title: { display: true, text: chartTitle, color: textColor, font: { size: 14, weight: 'bold' } },
            legend: { position: 'bottom', labels: { color: textColor, boxWidth: boxWidth, padding: padding, font: { size: fontSize } } }
          },
          scales: scalesConfig
        }
      });
      sourceDiv.style.display = 'none'; // 元の表を非表示
    };

    // 各クラスの表を探し実行
    document.querySelectorAll(".chart-MF").forEach(div => renderChart(div, 'MF'));
    document.querySelectorAll(".chart-cost").forEach(div => renderChart(div, 'cost'));
    document.querySelectorAll(".chart-stacked").forEach(div => renderStacked(div));
  };

  function getActualStyles() {
    const firstChart = document.querySelector('.chart-MF, .chart-cost, .chart-stacked, table');
    let el = firstChart, actualBg, actualText;

    while (el = el?.parentElement) {
      const s = getComputedStyle(el);
      if (!actualBg || actualBg === 'transparent' || actualBg.endsWith(', 0)')) actualBg = s.backgroundColor;
      if (!actualText) actualText = s.color;
      if (actualBg && actualBg !== 'transparent' && !actualBg.endsWith(', 0)') && actualText) break;
      if (el === document.body) break;
    }

    return { bg: actualBg, text: actualText };
  }
})();

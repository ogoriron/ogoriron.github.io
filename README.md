---
title: オゴリロン
layout: home
permalink: /
chartjs: true
description: "日本における割り勘、奢り奢られ論に関するデータを分析します。「昔は・・」そんな都市伝説を解体！"
---
{% comment %}
> [!NOTE]
> [https://ogoriron.github.io](https://ogoriron.github.io/) がトップページです。

{% endcomment %}
日本における**割り勘**、**奢り奢られ**論に関するデータを分析します。昔は・・そんな都市伝説を解体！

奢り文化が変わったのは戦後。1947年の日本国憲法で男女同権になったが、同僚の割り勘も増えたので平等思想からだろう。法律により、先輩後輩や男女の収入差はどんどん縮まっていく。

2008年『婚活時代』が出版され、91年間続いた『主婦の友』は廃刊した。若年層は、共働き8割時代に変わる。大卒女も5割以上だ。『婚活時代』の山田昌弘は、2002年に言ってる。昔のように男に経済的に頼るとか、高学歴女が格上の男を求めると、条件を満たす男は少なく結婚しにくい。

2003年の酒井順子『負け犬の遠吠え』。女性が社会進出し、格上の男は足りなくなった、自立して生活もできる。生活レベルが下がる結婚へと飛び込まない。2019年、そのまま独身だった酒井は、親兄弟が死に『家族終了』を出版した。これが行き着く先か。

※用語の制限: 「奢り」は100%を支払う。「割り勘」は50%ずつ支払う。その間をどう呼ぶかは個々の価値観になる。

<div class="tag-page-wrapper">
  <ul class="post-list">

{% comment %} 1. 検索したい日付の配列を定義します {% endcomment %}
{% assign target_dates = "1959-01-01,2021-01-01,2023-07-21" | split: "," %}

{% comment %} 2. ループで回して出力します {% endcomment %}
{% for date in target_dates %}
  <li>
    {% assign p = site.posts | where_exp: "item", "item.path contains date" | first %}
    {% if p %}
      <div>
        {%- comment -%} 記事の抜粋を表示 {%- endcomment -%}
        {{ p.excerpt }}
        {% assign p = site.posts | where_exp: "item", "item.path contains date" | first %}
        {% if date == "2023-07-21" and p %}
          <div style="margin-top: 8px;">
          <a href="{{ p.url | relative_url }}" class="read-more-link">続きを読む</a>
          </div>
        {% endif %}

        {% comment %} 記事のタグを表示 {% endcomment %}
        {% if p.tags %}
          <div class="tag-cloud-wrapper" style="margin: 12px 0 4px 0;">
            {% for tag_item in p.tags %}
              {% comment %} 1. 一旦フォールバック用のURLを作る {% endcomment %}
              {% assign sub_target_url = '/tags/' | append: (tag_item | slugify) | append: '/' %}
              
              {% comment %} 2. _tags フォルダ内の設定ファイルから正しい permalink を探す {% endcomment %}
              {% for page_item in site.tags %}
                {% if page_item.tag == tag_item %}
                  {% assign sub_target_url = page_item.permalink %}
                  {% break %}
                {% endif %}
              {% endfor %}
              
              {% comment %} 3. 安全になったURLでリンクを出力 {% endcomment %}
              <a href="{{ sub_target_url | relative_url }}" class="tag-cloud-badge">
                <span class="tag-cloud-dot"></span>
                {{ tag_item }}
              </a>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    {% endif %}
  </li>
{% endfor %}


  </ul>
</div>

<!--誘った方-->

{% include x-tag-cloud.html %}

[記事一覧](list)
- [出産費用](baby/)

{% comment %}<br>
## ライセンス

このリポジトリは複数のライセンスを含みます。

- _includes/ と _layouts/ は MITライセンスです。
- assets/mains.css も MITライセンスです。
- その他のファイル（_posts/など）は著作者が著作権を保持します。

## License

This repository contains mixed licensing.

- _includes/ and _layouts/ are licensed under the MIT License.
- assets/mains.css is also licensed under the MIT License.
- All other files (including _posts/) are © 2026 ogoriron. All rights reserved.

{% endcomment %}

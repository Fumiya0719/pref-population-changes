# 各都道府県の人口統計
## 使い方
- url: https://pref-population-changes-j7j3.vercel.app/#/
- 画面左の都道府県一覧の青いボタン(チェックボックス)から都道府県を選択します(複数選択可)。
- 選択した都道府県の人口が画面右にグラフで表示されます。
  - 表示されるのは1960年~2045年の5年ごとの人口で、2020年以降は推計値です。
- 選択を解除するとその都道府県のグラフは消去されます。
- 画面右上部のラジオボタンを切り替えると、特定の世代の人口に切り替えることができます。
  - 初期設定は総人口となっています。
  
---
## 感想など
### 結果
所要時間：24時間

### 感想
- コンポーネント間のデータの受け渡しや、各オブジェクトに設定するプロパティや型の設定など、意外と考えることが多くて難しかった
- 初めて知る(使う)概念やサービスがあって色々勉強になった
  - 途中からAtomic designに則ってコンポーネントを作ってみたが、確かにデータの流れが多少分かりやすくなった。ただうまく扱えているかは不明
  - Vercelでのデプロイがめちゃくちゃ簡単で驚いた
- 今まで処理速度のことを考えず個人開発してたので、何がデータ処理として最速・最適かを考える機会になって良かった
  
### 大変だったところ
- Highchartsに都道府県の人口情報を設定してグラフ描画する部分に手こずった
  - 中々動的にグラフ描画がされず、生highchartsやchart.jsなど色々試したが全て動かなかった。
  - 最終手段としてv-ifとnextTick()を使って無理やり再レンダリングする手法で対応したが、良い実装では無いと思うので残念

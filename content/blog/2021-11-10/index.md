---
title: 画像が読み込めなかったよ
date: "2021-11-10"
description: "ローカルだと見れた画像が表示されないやつの修正"
---

## TL;DR

 前回のデプロイ時、ヘッダー画像が表示できず  
チュートリアル見ながら修正するよ  
graphQL で無理やり取得したよ、おいおい望ましい形に直したいよ

---

### 前回デプロイ・ビルドで苦戦したよ

前回、デプロイ・ビルド時にめちゃめちゃにひっかかりまくった。  
ビルドエラーを吐いていたのは著者アイコンを相対パスで import しようとしたところ。

```
import AuthorImage from '../images/profile-pic.png';
..
<img src={AuthorImage} alt='ブロガーアイコン'/>
```

こんな感じで書いたんですが、ビルドエラーの嵐。

```
Building production JavaScript and CSS bundles　

Generating JavaScript bundles failed at src/images/profile-pic.png
```

gatsby 静的画像とかでググって、gatsby のプラグインが提供してる静的ファイル用のコンポーネント=`<StaticImage>`を使うよう修正しました。

```
import { StaticImage } from "gatsby-plugin-image";
...
<StaticImage
  layout="fixed"
  formats={["auto", "webp", "avif"]}
  src="../images/profile-pic.png"
  width={36}
  height={36}
  quality={95}
  alt="ブロガーアイコン"
/>
```

### 一難さってまた一難

これで無事著者アイコンは表示されたんだけど、そことは関係なくヘッダーに設置した git, twitter の SVG アイコンが本番だと表示されませんでした。  
ちょうどその作業をしていたのが喫茶店で、長居しすぎたしいい加減帰ってご飯食べたいな、という感じだったので後日直そうと思いながら帰宅。  
しばらく放置しちゃっていたけど、なんとなく解決策としては`<StaticImage>`使えばいいかな〜と考えていた。

### チュートリアルを真面目に読もう

今日はそれを修正する＆場当たり的なググりでなくちゃんとドキュメントを追っていこう、という気持ちで挑みました。  
[チュートリアル](https://www.gatsbyjs.com/docs/tutorial/part-4/)を頭から追っていき、そういえば graphQL でリソースとってくるんだよな？と気づく。  
ブログのタイトルも graphQL で`siteMetaData`からとってくるよう修正。  
さらに画像群も取得するよう変更。

```
query MyQuery {
  allFile {
    nodes {
      name
      publicURL
    }
  }
}
```

starter のデフォルトで作られてる`src/images`下の画像をとってきてるんだけど、クエリにはもともとのパスとか関係ないのかな？  
とってきた nodes 配列に find()かけてファイル名と一致するオブジェクトを取得、`publicURL`を src に指定すればビルド後のパスがとってこれる！…

自分で書いてて問題がいくつも思いついて、

- graphQL でとってくるのが正しいのか？静的ファイルなんだからもっとうまいことやれそう
- クエリの向き先あってる？`allFile`ってえらく仰々しいけどたとえば`images`とかないの？
- find()を各アイコンに使うので 2 度も回している。ファイル数が増えて配列でかくなったらだいぶ無駄じゃない？
  色々とあるんだけど、まあ graphQL なれするため、チュートリアルに慣らすためということで一旦は目を瞑ります。
  今後ドキュメントを追っていけばもうちょっとなんとかなるかも…

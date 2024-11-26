### **Next.js？**

可以補足單React問題,專注於伺服器端渲染 (SSR) 和靜態站點生成 (SSG)。

### **Next.js 可以解決的問題**

1. SEO
    
    解決傳統React單頁應用程序SPA,首次加載賴於JS,可能導致google爬蟲體驗造成SEO成效不好,Next.js提供伺服器端渲染<SSR>,可以在伺服器上升成完整的HTML,改善SEO表現。
    
2. 效能優化
    
    支援增量靜態站點生成(ISR),即便是大型網站也能保持效能同時“動態”更新內容。
    
3. **擴展性與靈活性**
    
    支援客製化 API 開發、混合渲染模式 (SSR/SSG)、國際化 (i18n)。
        
    分支任務：什麼是(CSR/SSR/SSG)
    - **CSR (Client-Side Rendering) 客戶端渲染**：在客戶端 (瀏覽器) 進行渲染，由 JavaScript 負責處理數據和生成 HTML。
    - **SSR (Server-Side Rendering) 服務器端渲染**：在服務器端進行渲染，生成 HTML 和 CSS，並在客戶端展示。
    - **SSG (Static Site Generation) 靜態網站生成**：在部署前生成靜態 HTML，不需要在瀏覽器或服務器上進行渲染

### **資料夾架構**
---

├── pages/ 📂
│   ├── index.js        # 預設首頁
│   ├── about.js        # 新增頁面 (對應 `/about` 路由)
│   ├── api/ 📂         # API 路由
│   │   ├── hello.js    # API 函數 (對應 `/api/hello`)
│   └── [slug].js       # 動態路由

├── public/ 📂
│   ├── images/         # 靜態圖片資源
│   ├── favicon.ico     # 網站圖標
├── components/ 📂      # 共用元件
│   ├── Navbar.js       # 導覽列元件
│   └── Footer.js       # 頁腳元件
├── styles/ 📂          # CSS/樣式檔案
│   ├── globals.css     # 全域 CSS
│   └── Home.module.css # 模組化 CSS
├── next.config.js      # Next.js 設定檔案
├── package.json        # 項目配置檔案
└── .next/              # 自動生成的編譯暫存檔

---

主要功能與應用範例

下列是整理NEXT.JS 常用功能與方法示範：

1. **頁面路由**Next.js 會根據 `pages/` 資料夾內的檔名自動生成對應路由：
    
    這部分邏輯就跟我之前php laravel差異最大的,但也是我覺的最爽的部分,採用基於檔名自動生成URL,並直接處理HTTP請求的邏輯,採用**無狀態函數式設計**
    

```jsx
// pages/index.js
export default function Home() {
  return <h1>首頁</h1>;
}
```

```jsx
// pages/about.js
export default function About() {
  return <h1>關於我們</h1>;
}
```

<訪問`/about`時,會自動呈現`about.js`的內容>

1. **動態路由<**支援以方括號定義動態路由>：

```jsx
// pages/[slug].js
export default function Page({ params }) {
  return <h1>{params.slug}</h1>;
}
```

1. **伺服器端渲染 (SSR)**使用`getServerSideProps`實現動態數據渲染：

```jsx

export async function getServerSideProps() {
  return { props: { message: "Hello from SSR!" } };
}

export default function Page({ message }) {
  return <h1>{message}</h1>;
}
```

1. **靜態站點生成 (SSG)**使用`getStaticProps`預生成靜態頁面：

```jsx
export async function getStaticProps() {
  return { props: { message: "Hello from SSG!" } };
}

export default function Page({ message }) {
  return <h1>{message}</h1>;
}
```

1. **API 路由**使用`pages/api`資料夾實現後端函數：

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: "Hello API!" });
}
```

1. **圖像優化**Next.js提供內建的圖像優化工具：

```jsx
import Image from 'next/image';
export default function Home() {
  return <Image src="/images/example.jpg" width={500} height={500} alt="Example" />;
}
```

1. **增量靜態生成 (ISR),**可以在構建時生成靜態頁面,並按需更新：

```jsx
export async function getStaticProps() {
  return {
    props: { content: "This is ISR content" },
    revalidate: 10, // 每 10 秒重新生成
  };
}
```

1. **國際化 (i18n)**
    
    Next.js 支援內建的多語系設定，透過`next.config.js`設定：
    
```jsx
module.exports = {
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
  },
};
```

跟我先前用的vue3 去做一個比較：
| **比較項目** | **Next.js** | **Vue 3** |
| --- | --- | --- |
| **框架類型** | React 基於伺服器端渲染的框架 | JavaScript 前端框架 |
| **渲染模式** | 支援 SSR、SSG、ISR，以及 CSR | 預設 CSR，透過 Nuxt.js 支援 SSR 和 SSG |
| **UI 實現** | 基於 React 組件的函數式編程模式 | 基於模板與響應式設計的 MVVM 模式 |
| 測試 | 使用 Jest 和 React Testing Library | 使用 Vue Test Utils 和 Jest |

**Next.js** 更適合需要高效能SEO 和 SSR 的應用,尤其是內容管理系統 (CMS) 或靜態網站

再來跟我相處四年的laravel比較：

| **比較項目** | **Next.js API 路由** | **Laravel API 路由** |
| --- | --- | --- |
| **路由定義** | 基於檔案系統,檔案名稱即路由 (`pages/api/hello.js`) | 在 `routes/api.php` 手動定義 (`Route::get('/hello')`) |
| 設計模式 | 無狀態函數式設計,單檔處理單一 API 邏輯,開發速度快。 | MVC 架構,路由映射到控制器,分層清晰。 |
| **靈活性** | 內建 API 路由適合輕量服務 | 可結合中間件、路由組群和命名空間,但不好維護。 |
| **內建功能** | 輕量化 API 寫法,快速搭建 REST API 或 GraphQL | 支援中間件、認證、驗證等豐富功能 |
| 部署方式 | 天然支援無伺服器架構（Serverless），如 Vercel、AWS Lambda | 需要 Web Server，如 Apache、NGINX |
| 性能 | 非阻塞式 I/O,適合高併發請求 | 同步執行,對 I/O 密集應用效能略低 |
- 使用 **Next.js API 路由**：
    - 想快速開發前後端整合的小型應用。
    - 部署到無伺服器環境 (Serverless) 的專案。
    - 前端開發為主,後端邏輯輕量化。
- 使用 **Laravel API 路由**：
    - 大型專案需要強大的資料管理與後端架構支援。
    - 需要與傳統 Web Server 整合。

隨然只有三四天深入認識Next.js已經可以體會出他開發速度與便捷的魅力,簡單來說Nextjs開發速度可以甩掉laravel開發時程好幾條大街。
---

上述講這樣多,我來實際應用就知道:


        

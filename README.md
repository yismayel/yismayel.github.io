#网站地址：yismayel.github.io    
#请使用手机官方浏览器
# 资源汇集（Next.js + Supabase）

准备工作：
1. 创建 Supabase 项目，建表：
   - resources: id(pk), title, description, url, category, created_at
   - comments: id(pk), resource_id, user_id, content, created_at, approved(boolean)
2. 在 Supabase 设置 Realtime（Postgres changes）以允许订阅 comments。
3. 在仓库根目录设置环境变量：
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY

本地运行：
1. npm install
2. npm run dev
3. 打开 http://localhost:3000

部署：推荐使用 Vercel，配置相同的环境变量。

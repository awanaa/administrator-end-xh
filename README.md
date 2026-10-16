# administrator-end-xh — Smart Campus Platform (Admin Client)

> **Competition project** — Vue 3 + Vite + Element Plus · Admin dashboard
> 管理者向けキャンパスプラットフォーム（管理端）

## About

`administrator-end-xh` is the **admin client** of the same smart campus / sports
management platform as [`xh`](https://github.com/awanaa/xh) (student client), built for
**【competition name TBD / 比赛名称待填】**.

It gives school staff full management over students, teachers, courses, attendance,
homework and physical-education (体育) records — with charts, search, forms and
role-based pages.

## Features

- 🏠 **Home dashboard** — stat cards and trend charts (ECharts)
- 👨‍🏫 **Teacher management** (教师管理) — CRUD with search / pagination
- 🎓 **Student management** (学生管理) — CRUD with class-based lists
- 📋 **Application management** (应用管理):
  - ✅ Attendance / checking (考勤)
  - 📢 Notices (通知)
  - 📚 Courses & timetable (课程) — weekly timetable view
  - 🌴 Leave requests (请假)
  - 📝 Exam papers (试卷)
  - 🏋️ **Physical education module** (smartSport views) — homework, physical
    records, sport items, photo records
- 📊 **Charts** — ECharts integration

## Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Vue 3 |
| Build | Vite 5 + vue-tsc |
| UI | Element Plus |
| Routing | Vue Router 4 |
| HTTP | Axios |
| Charts | ECharts 5 |

## Getting Started

```bash
cd xh1
pnpm install
pnpm dev        # starts Vite dev server
pnpm build      # type-check + production build
```

## Structure

```
xh1/                       # Vue 3 app (admin client)
├── src/
│   ├── pages/             # home / jiaoshi / xuesheng / yingyongguanli
│   ├── views/smartSport/  # physical-education module
│   └── router/
```

## Status

Completed for the competition; screenshots and live demo to be added.

# برمجة منطقية — موقع دليل دراسي تفاعلي RTL

مشروع React + Tailwind جاهز للنشر على Netlify، مبني كموقع عربي RTL لشرح محاضرات **برمجة منطقية** كما وردت في الملفات المرفوعة عن تنظيف البيانات، تجهيزها، وتحليلها باستخدام Excel وPower BI.

## حالة المحتوى الحالية

تمت تعبئة الموقع بالكامل اعتماداً على الملفات المرفوعة حالياً:

1. `تحليل 1 - معدل.pdf` — تحليل البيانات باستخدام Excel.
2. `برمجة منطقية 2.pdf` — Pivot Table وSlicer وTimeline وPivot Chart.
3. `تحليل البيانات باستخدام POWER BI.pdf` — مدخل Power BI ودورة حياة البيانات وأنماط الاتصال وPower Query.
4. `lab_4.pdf` — مصادر البيانات وData Preparation وعمليات الأعمدة والصفوف.
5. `lab_5.pdf` — Data Shaping وData Cleaning داخل Power Query.

كل محاضرة تحتوي على:

- Lecture overview.
- شرح نقاط المحاضرة بنفس ترتيبها.
- أمثلة مفصلة.
- ملخص منظم.
- MCQ تفاعلي.
- أسئلة نظرية امتحانية مع أجوبة نموذجية.
- تمارين إضافية موسومة بوضوح بأنها من إعداد الذكاء الاصطناعي.
- Cheat sheet للمراجعة السريعة.
- Code / Syntax blocks عند وجود صيغ Excel أو M أو خطوات شبه كودية.

## الميزات

- واجهة عربية RTL.
- Dark / Light mode.
- Home page فيها Hero، Warning box، Roadmap، Lecture cards، Search/filter.
- صفحات محاضرات كاملة بالبنية A → H.
- CodeBlock مع Copy button وشرح سطر بسطر.
- Progress indicator للمحاضرات المكتملة.
- Back to top button.
- Footer فيه AI disclaimer.
- Mobile-first responsive design.

## التشغيل المحلي

```bash
npm install
npm run dev
```

## البناء للإنتاج

```bash
npm run build
npm run preview
```

## النشر على Netlify

- Build command: `npm run build`
- Publish directory: `dist`

الملف `netlify.toml` موجود مسبقاً.

## أين أعدل أو أضيف محاضرات؟

افتح:

```txt
src/data/lectures.js
```

كل محاضرة هي Object داخل `lectures`. لإضافة محاضرة جديدة انسخ أي محاضرة موجودة وعدّل الحقول:

```js
{
  id: "lecture-6-your-title",
  number: 6,
  title: "عنوان المحاضرة",
  sourceFile: "اسم الملف.pdf",
  topics: ["Topic 1", "Topic 2"],
  explanation: [
    {
      title: "عنوان السلايد أو الفقرة",
      original: "النص الأصلي يقول: ...",
      simple: "الشرح المبسّط: ...",
      examples: ["..."],
      why: "لماذا هذا مهم؟ ...",
      commonMistake: "خطأ شائع: ...",
      examNote: "ملاحظة امتحانية: ..."
    }
  ],
  quiz: [
    {
      question: "السؤال",
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
      explanation: "سبب الإجابة"
    }
  ]
}
```

## قواعد المحتوى

- لا تضع أي نص داخل `original` إلا إذا كان موجوداً في المحاضرة فعلاً أو ملخصاً أميناً لها.
- أي شرح إضافي اكتبه داخل `simple` أو ابدأه بعبارة: `شرح زيادة للفهم`.
- أي تمرين غير موجود في المحاضرة يجب أن يبقى موسوماً: `تمرين إضافي من إعداد الذكاء الاصطناعي`.
- حافظ على ترتيب السلايدات الأصلي داخل `explanation`.
- أضف 10 أسئلة على الأقل داخل `quiz` لكل محاضرة.

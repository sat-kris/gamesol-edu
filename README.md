# GamesolEdu – exam practice by class and subject

Students pick their **class → subject → chapter → topics**, choose **Easy**, **Hard** or **Advanced**, and take a quiz with new questions every time. At the end they see their score per topic, explanations for every mistake, and their **rank** on the class leaderboard. Teachers see everything on a dashboard.

## Files

| File | What it is |
|---|---|
| `index.html` | The main site (home page) |
| `edu-kids-config.json` | **The config file**: classes, subjects, chapters and which ones are *ongoing* |
| `banks/class9-science-ch4.json` | Science Ch 4 question bank (from `science c4.pdf`) |
| `french/index.html` | The Class IX French grammar practice page |
| `dashboard.html` | Teacher dashboard (password protected) |
| `apps-script/Code.gs` | Saves scores in a Google Sheet (goes in Google, not GitHub) |

## Controlling what students can choose – `edu-kids-config.json`

Only items with `"status": "ongoing"` can be selected. Anything else (e.g. `"upcoming"`, `"completed"`) is hidden and shown as "Coming soon".

```json
{ "id": "9", "name": "Class IX", "status": "ongoing", "subjects": [
    { "id": "science", "name": "Science", "status": "ongoing", "chapters": [
        { "id": "ch4", "name": "Chapter 4 · Describing Motion Around Us",
          "status": "ongoing", "bank": "banks/class9-science-ch4.json" } ] },
    { "id": "french", "name": "French (018)", "status": "ongoing", "link": "french/index.html" },
    { "id": "maths", "name": "Mathematics", "status": "upcoming" } ] }
```

- To **open** a class, subject or chapter, change its status to `"ongoing"`.
- To **close** one after the exam, change it to `"completed"`.
- A subject with `"link"` opens its own practice page (like French). A subject with `"chapters"` uses question banks.

Edit the file on GitHub with the ✏️ pencil icon and commit. The site updates in about a minute.

### Extra sources (e.g. school worksheets) and how to switch them off

A chapter can list extra question files in `"extras"`. Their questions join the chapter's quiz (tagged **School worksheet**),
any new topics appear in the topic list, and any `play` activities are added to Play & learn.

```json
{ "id": "ch2", "name": "Chapter 2 · Lines and Angles", "status": "ongoing",
  "bank": "6/maths/bank-ch2-lines-angles.json", "tutor": "6/maths/tutor-ch2-lines-angles.json",
  "extras": ["6/maths/adds/adds-ch2-lines-angles.json"] }
```

To **exclude every file in an `adds` folder** in one step, put the folder name in `exclude` at the top of the config:

```json
"exclude": ["adds"],
```

Remove it again (`"exclude": []`) to switch them back on. Nothing else needs to change. Class VI Maths currently has
extras for Chapters 1, 2 and 4 built from the Loyola International School worksheets and PA1 question bank in `6/maths/adds/`.

### Levels: Easy, Hard and Advanced

Every quiz offers **Easy**, **Hard** and **Advanced**. Advanced questions stay inside the same syllabus but are multi-step,
use unfamiliar contexts or combine ideas (e.g. average speed over two halves of a trip, reflex angles, Collatz step counts,
"which statement is NOT correct" and assertion–reason in Social Science). Questions are marked with `"level": "advanced"` in
the bank files; if a topic has none, Advanced falls back to Hard questions for that topic. The French page has its own
**Avancé** level. The leaderboard and dashboard track Advanced separately – after updating, paste the new
`apps-script/Code.gs` into your Apps Script project and choose **Deploy → Manage deployments → Edit → New version**.

## Science Chapter 4 topics

| Ref | Topic |
|---|---|
| 4.1.1 | Describing position and motion |
| 4.1.2 | Distance travelled and displacement |
| 4.1.3 | Average speed and average velocity |
| 4.1.4 | Average acceleration |
| 4.2.1–4.2.2 | Position–time graphs |
| 4.2.3 | Velocity–time graphs |
| 4.3 | Kinematic equations |
| 4.4 | Motion in a plane and uniform circular motion |

There are 83 question templates: concept MCQs taken from the chapter, drawn graphs, and numerical problems (km h⁻¹ conversion, v = u + at, s = ut + ½at², v² = u² + 2as, braking and reaction distance, areas under v–t graphs, circular motion). The numerical questions get new numbers every time.

## Class V Science – Our Wondrous World (NCERT, Chapters 1–4)

Files live in `5/science/` next to the chapter PDFs (`c1.pdf` … `c4.pdf`):

| Chapter | Question bank | Tutor | Topics |
|---|---|---|---|
| 1 · Water — The Essence of Life | `bank-ch1-water.json` | `tutor-ch1-water.json` | Fresh and salt water · Forms and water cycle · Groundwater and rivers · Life in water |
| 2 · Journey of a River | `bank-ch2-river.json` | `tutor-ch2-river.json` | The Godavari · Rivers and dams · Pollution · Floods and saving water |
| 3 · The Mystery of Food | `bank-ch3-food.json` | `tutor-ch3-food.json` | Microbes and spoilage · Preservation · Good microbes · Teeth and chewing |
| 4 · Our School — A Happy Place | `bank-ch4-school.json` | `tutor-ch4-school.json` | Green school · Waste · Keeping cool and saving water · Safety and kindness |

Same design as the other classes: Play & learn activities, a chapter tutor and Easy / Hard / Advanced quizzes, all taken from the textbook.

## Class VI French (Second Language)

Files live in `6/french/` next to the model paper, answer key and teaching notes. Built from the BHPS Class VI midterm model paper 2026-27 (and the -IR verb and culture notes):

| Chapter | Question bank | Tutor | Topics |
|---|---|---|---|
| 1 · Les verbes au présent | `bank-ch1-verbes.json` | `tutor-ch1-verbes.json` | -ER verbs · -IR verbs · être/avoir/aller/faire · lire/prendre/comprendre/mettre |
| 2 · Négation, articles et phrases | `bank-ch2-grammaire.json` | `tutor-ch2-grammaire.json` | ne…pas / pas de · au, à la, à l’, aux · du, de la, de l’, des · word order |
| 3 · Vocabulaire | `bank-ch3-vocabulaire.json` | `tutor-ch3-vocabulaire.json` | Ordinals · days, months, seasons · family, opposites, clothes |
| 4 · Compréhension et expression | `bank-ch4-comprehension.json` | `tutor-ch4-comprehension.json` | Reading · dialogues · descriptions |
| 5 · Culture et civilisation | `bank-ch5-culture.json` | `tutor-ch5-culture.json` | Symbols · geography · monuments and food |

## Class VI Mathematics (NCERT Ganita Prakash, midterm Chapters 1–5)

| Chapter | Topics | Files in `6/maths/` |
|---|---|---|
| 1 · Patterns in Mathematics | sequences, visualising, relations, shape patterns | `bank-ch1-patterns.json`, `tutor-ch1-patterns.json` |
| 2 · Lines and Angles | point/segment/line/ray, naming angles, angle types, protractor | `bank-ch2-lines-angles.json`, `tutor-ch2-lines-angles.json` |
| 3 · Number Play | supercells, digits, palindromes, Kaprekar, mental maths, Collatz | `bank-ch3-number-play.json`, `tutor-ch3-number-play.json` |
| 4 · Data Handling and Presentation | tally/frequency, pictographs, bar graphs, scales | `bank-ch4-data-handling.json`, `tutor-ch4-data-handling.json` |
| 5 · Prime Time | common factors/multiples, primes, co-primes, prime factorisation, divisibility | `bank-ch5-prime-time.json`, `tutor-ch5-prime-time.json` |

Questions follow the BHPS midterm model paper answer key (1-mark MCQs, assertion–reason, 2/3/4-mark types and case studies). Many questions are generated fresh each time by `generators.js`: Kaprekar rounds, Collatz sequences, prime factorisation, co-prime pairs, divisibility, protractor readings, pictographs, bar graphs and tally marks. Each tutor's **Exam readiness** page lists which model paper questions came from that chapter.

Note: `6/maths/model/CLASS_6_MIDTERM_EXAM_MODEL_PAPER_2026.pdf` on GitHub is empty (2 bytes). Re-upload it if you want it stored; the app does not need it.

## Play & learn (Class VI Maths)

`play.js` adds 24 hands-on activities, one or two per lesson, for learning by doing before reading definitions. Students open them from the **Play & learn** mode on the home screen, the Play & learn tab in the tutor, or at the top of each lesson:
- Ch 1: pattern detective, dot builder, odd numbers build squares, join every dot
- Ch 2: segment/ray/line, angle maker, name that angle, protractor practice
- Ch 3: supercell spotter, digit sum builder, palindrome maker, Kaprekar machine, quick estimate, Collatz hailstones
- Ch 4: tally tapper, pictograph builder, bar graph reader, bar graph builder
- Ch 5: idli-vada game, rectangle maker, sieve of Eratosthenes, co-prime checker, factor ladder, divisibility detective

Activities are attached in each tutor file as `"play": [{"type": "…", "title": "…", "say": "…"}]`.

## Class X Social Science – Political Science (NCERT Democratic Politics II, Chapters 1–5)

Files live flat in `10/social/` next to the chapter PDFs (`c1.pdf` … `c5.pdf`):

| Chapter | Question bank | Tutor | Topics |
|---|---|---|---|
| 1 · Power-sharing | `bank-ch1-power-sharing.json` | `tutor-ch1-power-sharing.json` | Belgium & Sri Lanka · Why power sharing · Forms |
| 2 · Federalism | `bank-ch2-federalism.json` | `tutor-ch2-federalism.json` | What is federalism · India's federation · How it is practised · Decentralisation |
| 3 · Gender, Religion and Caste | `bank-ch3-gender-religion-caste.json` | `tutor-ch3-gender-religion-caste.json` | Gender · Religion · Caste |
| 4 · Political Parties | `bank-ch4-political-parties.json` | `tutor-ch4-political-parties.json` | Why parties · Party systems · National & State parties · Challenges & reforms |
| 5 · Outcomes of Democracy | `bank-ch5-outcomes-of-democracy.json` | `tutor-ch5-outcomes-of-democracy.json` | Government · Economy · Dignity & freedom |

Questions follow the CBSE pattern: one-mark MCQs, assertion–reason, case/source-based passages and "which one?" classification items
that draw a random fact each time. Each tutor has the big idea, lessons with exam tips, a key-facts sheet, a revision sheet and an
exam page (marks pattern, 3- and 5-mark answer frames, checklist). Play & learn uses four generic activities built into `play.js`:
**sort** (tap a card into its bin), **match** (pair left with right), **order** (build a sequence) and **dataBars** (read the textbook's
data tables as bar charts and answer). Any future text subject can reuse them just by adding `play` blocks to a tutor lesson.

## Chapter tutor

When a chapter has a `"tutor"` file in the config, a **Tutor** book icon appears on its chapter card. Students also get a choice: **Chapter tutor** (learn) or **Check knowledge** (quiz).

The tutor for Chapter 4 (`tutor/class9-science-ch4.json`) follows the NCERT textbook and includes:
- **Overview:** the "ladder of motion" (position → displacement → velocity → acceleration), the three ways to describe motion, and a 3-pass study plan.
- **8 lessons**, each with:
  - a hook and the core definitions;
  - a diagram or graph;
  - a worked example to try before revealing the solution;
  - exam traps, an exam tip and a memory hook;
  - typical exam questions and tap-to-reveal recall cards;
  - "Mark as understood" and "Practise this topic" buttons.
- **Formula sheet**, a **smart revision** sheet for spaced revision, and an **exam readiness** page with the GUFS method for numericals, graph and answer-writing strategy, and an "Am I ready?" checklist.

Progress is saved in the student's own browser.

To add a tutor for another chapter, copy the tutor JSON, rewrite the content, and add `"tutor": "tutor/<file>.json"` to that chapter in `edu-kids-config.json`.

### Adding a chapter or subject
1. Copy `banks/class9-science-ch4.json` to a new file, e.g. `banks/class9-science-ch5.json`, and replace the topics and questions.
2. Add the chapter to `edu-kids-config.json` with `"status": "ongoing"` and `"bank": "banks/class9-science-ch5.json"`.

A multiple-choice question in a bank looks like this:
```json
{ "topic": "accel", "level": "easy", "q": "The SI unit of acceleration is…",
  "a": "m s⁻²", "w": ["m s⁻¹", "m² s⁻¹", "s m⁻²"], "e": "Change in velocity ÷ time = m s⁻²." }
```
`a` is the correct answer, `w` are three wrong answers, and `e` is the explanation shown after answering.

## Leaderboard and dashboard setup (once, about 10 minutes)

1. Create a Google Sheet, then open **Extensions → Apps Script**. Paste in all of `apps-script/Code.gs`.
2. Change `TEACHER_KEY` on line 9 to your own password, then click **Save**.
3. Click **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**, click **Deploy** and authorize. If you see "Google hasn't verified this app", click **Advanced → Go to project → Allow**.
4. Copy the Web app URL and paste it into `edu-kids-config.json`:
   ```json
   "leaderboard": { "scriptUrl": "https://script.google.com/macros/s/AKfy…/exec" }
   ```
5. Commit. Students now see the leaderboard and their rank. The French page uses the same link automatically.
   There is no section field. Each student is given a short fun nickname (e.g. *CalmFox3F* – two short words plus a 2-character code) and a colour avatar, remembered on their device. They can keep it, tap **🎲 New name**, or type their own made-up name (3–24 letters or numbers, no spaces). `Code.gs` refuses anything else (redeploy after updating it).

- Dashboard (cockpit): `https://<username>.github.io/<repo>/dashboard.html`. Enter your teacher password. It opens with **stats first** and shows details only when you ask:
  - **8 headline numbers** – active students, quizzes finished, average score, completion (started vs finished), sessions, time per quiz, Chapter tutor use and Play & learn use – each compared with the previous period. Click any number for its details.
  - **Key insights** written for you: weakest topic, students below 50%, quiz drop-off, students not seen for 7 days, improving students, students ready for Hard, most/least practised chapters, unused features and the busiest time. Each has a link to the list behind it.
  - Charts: per day (switch between quizzes, active students and sessions), score spread, weakest topics and feature usage, plus a **by class and subject** table (click a row to focus on it).
  - Folded sections you open when needed: **Students** (click a name for their score trend, weak topics, features used and every quiz), **Latest attempts** and the raw **Activity log**.
  - Filters: period (today, 7, 30, 90 days, all time), class, subject, section and level.
- Raw data: the **Attempts** tab of your Google Sheet.
- **Feature usage** (on the dashboard): which parts of the site students use – visits, class/subject/chapter picks, Chapter tutor pages, flashcards, worked examples, Play & learn activities, quizzes started and finished, leaderboard tabs and nickname changes. Each row shows how many times it was used and by how many different nicknames; **Most used** lists the top chapters, tutor pages, activities and quizzes. The period, class and subject filters apply. Raw events go to a new **Activity** tab (created automatically) with time, nickname, a random per-tab session id, page, class, subject, chapter, event and detail. Nothing personal is logged – only the made-up nickname. Events are sent in small batches (when the tab is hidden or closed, and every minute), so the site stays fast. Logging starts only after you paste the new `Code.gs` and deploy a **New version**.
- The leaderboard has three views: **🏆 Top scores** (best score per nickname, for each class + subject + level; ties go to the faster time), **🕒 All attempts** (every finished quiz in that class + subject, newest first, last 30) and **🙋 My attempts** (the player's own history with a progress tip).
- If you change `Code.gs` later, go to **Deploy → Manage deployments → Edit → New version**.

## Notes
- The site must be opened through GitHub Pages or another web server. Opening `index.html` straight from your computer can't read the config file.
- Scores are sent from the student's browser, so a student who knows web programming could fake a score. Use this for practice, not for marks.

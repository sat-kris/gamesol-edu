# Gamesol Edu – exam practice games

Students pick their **class → subject → chapter → topics**, choose **Easy** or **Hard**, and play a quiz with new questions every time. At the end they see their score per topic, explanations for every mistake, and their **rank** on the class leaderboard. Teachers see everything on a dashboard.

## Files

| File | What it is |
|---|---|
| `index.html` | The game (home page) |
| `edu-kids-config.json` | **The config file**: classes, subjects, chapters and which ones are *ongoing* |
| `banks/class9-science-ch4.json` | Science Ch 4 question bank (from `science c4.pdf`) |
| `french/index.html` | The Class IX French grammar game |
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
- A subject with `"link"` opens its own game (like French). A subject with `"chapters"` uses question banks.

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
the bank files; if a topic has none, Advanced falls back to Hard questions for that topic. The French game has its own
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
5. Commit. Students now see the leaderboard and their rank. The French game uses the same link automatically.
   There is no name box and no section field. Each student gets a fun game name built from two word lists plus a number (e.g. *AuraCapybara18*), remembered on their device. They can pick the words or tap **🎲 Shuffle**, but cannot type, so real names never reach the leaderboard. `Code.gs` also rejects any name not built from the same word lists (redeploy after updating it).

- Dashboard: `https://<username>.github.io/<repo>/dashboard.html`. Enter your teacher password. You can filter by period, class, subject, section and level, and see weak topics, students and the latest attempts.
- Raw data: the **Attempts** tab of your Google Sheet.
- There's a separate leaderboard for each class + subject + level. Each student's best score counts, and ties go to the faster time.
- If you change `Code.gs` later, go to **Deploy → Manage deployments → Edit → New version**.

## Notes
- The site must be opened through GitHub Pages or another web server. Opening `index.html` straight from your computer can't read the config file.
- Scores are sent from the student's browser, so a student who knows web programming could fake a score. Use this for practice, not for marks.

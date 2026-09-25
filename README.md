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
5. Commit. Students now see a name box, the leaderboard and their rank. The French game uses the same link automatically.

- Dashboard: `https://<username>.github.io/<repo>/dashboard.html`. Enter your teacher password. You can filter by period, class, subject, section and level, and see weak topics, students and the latest attempts.
- Raw data: the **Attempts** tab of your Google Sheet.
- There's a separate leaderboard for each class + subject + level. Each student's best score counts, and ties go to the faster time.
- If you change `Code.gs` later, go to **Deploy → Manage deployments → Edit → New version**.

## Notes
- The site must be opened through GitHub Pages or another web server. Opening `index.html` straight from your computer can't read the config file.
- Scores are sent from the student's browser, so a student who knows web programming could fake a score. Use this for practice, not for marks.

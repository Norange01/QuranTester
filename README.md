# QuranTester: Advanced Quizzing System for Testing Your Quran Memorization
## Algorithm
In this quizzing system, questions (or in this case, verses) are split into 2 main categories:
- Forgotten: questions untested or tested and answered correctly
- Incorrect: questions answered incorrectly
The number of forgotten verses tested for every incorrectly-answered verse tested depends on a ratio the user sets. This system provides a balance between forcing the brain to strengthen memory of the incorrectly-answered verses by frequent testing, routinely testing the verses answered correctly to avoid forgetting them, and annotating untested verses to have memorization strength data for all verses. Each time a verse is tested, the current timestamp is stored in order to always sort both sets of questions from the earliest tested to the latest tested.
## Other Tools Used
his project uses Supabase for user authentication and data storage. That way, users can access the application anywhere: on their other screen while working, on their phone while on the bus, or on their iPad when competing with their friends. The main framework used was Astro due to its simplicity and support for modular design. The project is currently hosted by Vercel.

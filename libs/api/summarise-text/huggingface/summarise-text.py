from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

ARTICLE = """
You don’t always have to give your boss the finger
Maybe it’s your first day on the job. Perhaps your manager just made an announcement. You’ve been asked to scan your fingerprint every time you clock in and out. Is that even allowed?
From Hooters to Hyatt Hotels, employers tantalized by the promise of a futuristic, streamlined way to track workers’ attendance are starting to use time clock machines that fingerprint employees.
Vendors like Kronos and Allied Time say that because the machines are tied to your biometric information — unique characteristics such as your face, fingerprints, how you talk, and even how you walk — they provide a higher level of workplace security and limit employees’ ability to commit “time theft” by punching in for one another.
But the benefits for your boss may come at a cost to you — both your privacy and possibly your health.
With the global outbreak of COVID-19, your personal health could be at risk when using frequently touched screens and fingerprint scanners. The Centers for Disease Control says that coronavirus can remain on surfaces for hours, so screens and scanners should be regularly disinfected with cleaning spray or wipes. And you should wash your hands for 20 seconds or use alcohol-based hand sanitizer immediately after using one.
In addition to these health concerns, critics argue that biometric devices pose massive personal security issues, exposing workers to potential identity theft and subjecting them to possible surveillance from corporations and law enforcement.
In an amicus brief in a case before a federal court of appeals, a group of privacy advocates, including the ACLU and the EFF, wrote that “the immutability of biometric information” puts people “at risk of irreparable harm in the form of identity theft and/or tracking.”
“You can get a new phone, you can change your password, you can even change your Social Security number; you can’t change your face,” said Kade Crockford, the Technology for Liberty program director at ACLU of Massachusetts.
Companies facing legal action over their use of the machines range from fast food joints like McDonald’s and Wendy’s, to hotel chains like Marriott and Hyatt, to airlines like United and Southwest.
In some cases, the companies have countered in the lawsuits that their employees’ union agreement allows the use of the machines: “Southwest and United contend that the plaintiffs’ unions have consented — either expressly or through the collective bargaining agreements’ management-rights clauses — and that any required notice has been provided to the unions,” the court’s opinion states.
Other companies have not responded to requests for comment or have said they cannot comment on active litigation.
Privacy and labor laws have lagged behind the shifts in the American workplace. But in some places, you have the right to refuse and even sue."""

print(summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False))
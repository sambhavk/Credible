Credible is a Technology-Community based hybrid platform to verify and certify viral news social media forward messages for their authenticity. 

Inspiration
In a post-truth era, the contagion of fake news has gripped the world in equal parts. Right from the United states of America, to emerging economies like India, Brazil and others, no one seems to be spared. Deeply interlinked with technological developments, “disinformation” and “misinformation” have become pervasive in our news bubbles. As the world’s largest democracy with the second largest population, the issue of fake news poses a unique threat in India. Not only do the low literacy rates make it hard to implement the true spirit of democratic decision-making, but add to that an explosion of fake news and divisive propaganda, and there looms a real threat to the country’s democratic fabric itself

Major incidents like the current pandemic, elections, or religious tensions are big triggers of spreading false news that leads to fear in most cases and triggers aggression/anti-social behaviors in some cases.

Fake News has now become a Real problem for our Societies growth.

So, we built Credible - A Technology-Community based hybrid platform to verify and certify viral news social media forward messages for their authenticity.

What it does
Credible is a platform that aggregates all available approaches for Fake news verification into a Single Platform. Its a tool as easy to use for people across ages and literary backgrounds that fact-checking becomes natural to everyone sharing news/facts online.

Its so easy to use as “Just WhatsApp the news message to Credible no. and get an instant reply with the fact-check of the message.”

Credible Rates each message with Fact-check into below score of 1-5:

Confirmed False - Fake Message sent to deceive
Fishy - Use own judgment, with multiple contradicting sources with a few supporting and a few rejecting the claims
Partial Truth - Some of the facts are true, but not the whole message. These types of messages are misleading readers by using a known fact to make people believe of false facts.
Mostly True  - Few sources available
Confirmed True - Many genuine sources available to confirm

How Credible Works?
For every message fwd to Credible we run through existing sources of Fact Validity done on internet and reply instantly to users.
In cases if this is a recent article then Credible may not find the relevant info on internet, then we push notifications to several onboard Crowd Auditors - our Credible Heroes Community.
These "Credible Heroes" is a community of knowledgeable people like journalist, engineers, doctors, teachers, historians, and general people who have volunteered to donate their time and wisdom to the society for the cause of debunking the daily false facts roaming on internet. That's why they are Heroes for our society.
Currently if someone wants to request a factcheck from a news agency, they need to contact each agency separately. and chances of them responding is also less if the message is a regional message, or the people in agency are not taking this up on priority. Credible will have all these major News agencies listed as Verified Crowd Auditors. So that whenever someone requests a fact check on credible that is not done already, we will send it to all listed News Agencies automatically.
To increase the chances of getting responses, Credible generates certain attributes for the messages, like language, locality, etc, and classifies the article into a category e.g. medical, political, social, agriculture, science, automobiles, etc.
Based on the attributes of the article, now the article will be pushed to Credible Heroes for validating authenticity.
To keep the success rate high for getting a valid response, these Heroes will be selected based on their profile and their Reputation of validating similar attributed articles in the past.
Based on the responses from the Heroes we aggregate the result into a single score by incorporating the Reputation of there past record of genuine responses.
The Credible Trust Algorithm
*Trust-System for Manual Screening by Crowd Auditors *

Every hero onboard the platform begins with initial base reputation point.
Verified profiles like Journalist, Doctors, etc. will have an increased initial Reputation points.
Credible Score calculated for Messages incorporate the Reputation points of the Heroes submitting the scores as = Reputation Points X Submitted Credible Score = Summited Score of Individual Credible Hero.
The "Summited Score of Individual Credible Hero" from above are aggregated into a "Final Credibility Score" of the message.
Credible relies on the multiple number of responses to aggregate them into a single score in the range of 1-5
Basis of the concept of "The Wisdom of the Crowd", the system considers this to be the right/correct score for the message. The larger the no. of responses, more accurate is the score of the message.
If submitted score by a particular Crowd Auditor is in range (+1 or -1 ) of the final message Credibility Score, then his/her response is considered to be correct.
Heroes are rewarded with increased Reputation points for providing correct info.
Heroes submitting incorrect info will have Reputation points reduced for each wrong info.
So that genuine Crowd auditors will continue to move up in reputation and the less-genuine auditors will move down in reputation to 0 and hence there votes wont count anymore.
This way the system maintains the authenticity of the users responses.
How I built it
We used React and NodeJS for the main WebApp and hosted on Google Firebase. We also built a WhatsApp chat Interface using Twilio APIs. In the backend we're using MokeyLearn MachineLearning APIs to power our NLP. Googles Fact-check markup tool to optimize out searches for preexisting Fact checks available on various reputed sources.

Challenges We ran into
The fake news is tailored for human beings to make them believe of false facts. And sometimes targeted to a certain region or ethnicity. And so we cannot blindly rely on AL/ML for validating such fake news. . So, we need to build a system that involves people (Crowd Auditors - Our Credible Heroes) to generate authentic info, but at the same time making sure to nullify the biases and false info being fed into the system (if in any case).

We built a solution to fix this using the concept of The Wisdom of the Crowds as below:

Find the most relevant Crowd Auditor for getting the Message screened for authenticity by matching the message attributes with the attributes of the Crowd auditor.
Aggregate the responses into a single score while respecting the Reputation of each Crowd Auditor.
Increase the Reputation of a particular Crowd Auditor incase his Language/Locality matches with the Message to be screened. So that his research of the fact will be valued more in aggregation of final score.
Accomplishments that We're proud of
We the current official work load, we are proud that we could pull-off the POC to this level. The POC is stable for validating the pre-existing fact checks done by reputed sources and sending notifications to the onboard heroes incase manual screening is needed.

What We learned
We learned a lot about the tech we used here. This was an opportunity to learn React, NodeJS and some NLP concepts used in Credible. The Twilio API is fun to use, the way we are able to simple build powerful apps without needing GUI for user to Interact with the system.

What's next for Credible
Stabilize the application beyond the POC stage and link the existing News Agencies communications channels for Factchecks published by them into our platform. So that users wont need to submit a fact-check request individually to multiple new agencies separately.

Currently we support Text-only messages, and want to expand the capability to Multimedia messages We want to be a one-stop platform like IMDB is for Movie ratings, Credible is your one-stop platform for Validity of Social news. We've trimmed down our solution to a level that its totally transparent to the user and as simple as just forwarding a message. This beauty of simplicity in usage will increase the adaptability of the platform and build a brand for people to cross check messages before blindly forwarding.

Try it out yourselves:
To try out the WhatsApp Fact-Check feature, you will need to join out Twilio Sandbox as mentioned below:

Save +1 415-523-8886 as Credible.
Send join mountain-weather to Credible
You'll receive an Acknowledgment
Send any fact messages you want to check and get instant replies.
To Use the WebApp, go to credible.web.app

Congrats!! You are part of Credible Network. Please share your feedback in comments below.

Built With
firebase
mysql
node.js
react
twilio
Try it out
 credible-38f19.web.app

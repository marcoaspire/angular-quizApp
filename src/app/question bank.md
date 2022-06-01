
# Geogra
  Which of these U.S. states does NOT border Canada?
  Maine
  Minnesota
  Indiana--
  Alaska

  Which of these countries was NOT a part of the Soviet Union?
  Belarus
  Ukraine
  Georgia
  Poland--

  5 Which of these cities is NOT a national capital?
   Sydney--
   Cairo
   Prague
   Bangkok

   6 Which of these cities DOESN'T border the Mediterranean Sea?
    Monaco
    Barcelona
    Lisbon--
    Alexandria




   7 Which of these countries was NEVER part of the British Empire?
    Thailand--
    Kenya
    Ireland
    New Zealand



   8 Which one of these cities is NOT in the Southern Hemisphere?
    Johannesburg
    Brisbane
    Colombo--
    Brasilia

    

9Which one of these countries is NOT in Central America?
Belize
Honduras
Panama
Suriname--



10Which of these cities does NOT border the Great Lakes?
Toronto
Chicago
Pittsburgh--
Cleveland



11Which of these countries is NOT majority-Muslim?
Indonesia
Morocco
Albania
Ethiopia--




12Which of these countries is NOT recognized by the United Nations?
Iran
Israel
Taiwan--
Cyprus


13Which of these mountain ranges is NOT in Europe?
Carpathian Mountains
Atlas Mountains--
The Pyrenees
The Alps




14Which of these things is NOT located in Africa?
Lake Victoria
Aswan Dam
Zambezi River
Gobi Desert--




15Which of these countries is NOT one of the top 20 oil producers?
United States
Iraq
Norway
Morocco--


16Which of these cities is NOT in India?
Bangalore
Karachi--
Chennai
Bhopal




17Which of these countries does NOT have only one border?
Portugal
Ireland
Haiti
North Korea--


  insert into tbl_questions(Query,CategoryID)
    values ('What is the smallest planet in the solar system?',5),
           ('What is the largest planet in the solar system?', 5),
           ('Which planet is closest to the sun?',5),
           ('Which planet is furthest from the sun?',5),
           ('Which planet is closest to Earth?',5),
           ('What is the hottest planet by average surface temperature?',5),
           ('Which planet is closest in size to Earth?',5),
           ('Which planet has exactly two moons?',5),
           ('Which planet is known as "Lucifer" or "The Morning Star"?',5),
           ('Which of these planets is visible from Earth with the naked eye?',5),
           ('On which planet would you find the "Great Red Spot"?',5),
           ('Which planet appears to move most quickly across the sky, when observed from Earth?',5)
           ('Which planet has the most volcanoes, active or dormant?',5)
           ('Which planet was discovered by William Herschel in 1781?',5);

# Planets 5

    

What is the smallest planet in the solar system?
Mars
Mercury--
Venus
         
19-What is the largest planet in the solar system?
Earth
Jupiter--
Neptune
Saturn


Which planet is closest to the sun?
Jupiter
Mercury--
Venus
Different planets at different times
         
Which planet is furthest from the sun?
Neptune--
Saturn
Uranus
Different planets at different times




Which planet is closest to Earth?
Mars
Saturn
Venus
Different planets at different times--


         
What is the hottest planet by average surface temperature?
Jupiter
Mercury
Uranus
Venus--



Which planet is closest in size to Earth?
Mars
Mercury
Neptune
Venus--



Which planet has exactly two moons?
Mars--
Neptune
Uranus
Venus





Which planet is known as "Lucifer" or "The Morning Star"?
Mars
Neptune
Jupiter
Venus--




Which of these planets is visible from Earth with the naked eye?
Jupiter
Mars
Saturn
All of the above--



On which planet would you find the "Great Red Spot"?
Jupiter--
Mars
Neptune
Venus




Which planet appears to move most quickly across the sky, when observed from Earth?
Mercury--
Mars
Neptune
Saturn



Which planet has the most volcanoes, active or dormant?
Earth
Saturn
Uranus
Venus--

Which planet was discovered by William Herschel in 1781?
Mercury
Mars
Neptune
Uranus--

insert into tbl_answers(PosibleAnswer,QuestionID,Correct)
        values ('Mercury',31,0),
            ('Mars',31,0),
            ('Neptune',31,0),
            ('Uranus',31,1);

# World War II 6
insert into tbl_questions(Query,CategoryID)
    values ('Did the Germans ever capture Moscow?',6),
           ('How did Hitler die?',6),
           ('Which of these countries did NOT fight in WWII?',6),
           ('What was the name of the American effort to build an atomic bomb?',6),
           ('About 70 million people died as a result of WWII.  What percent of these people were from the United States?',6),
           ('What was the role of Joseph Goebbels in the Nazi government?',6),
           ('What was the code name of the German invasion of the Soviet Union?',6),
           ('What machine did the Germans use to (unsuccessfully) encrypt their messages?',6),
           ('What city''s fall to the Japanese in 1942 caused 80,000 British and allied troops to be taken prisoner?',6),
           ('What country signed a non-aggression pact with Germany in August, 1939?',6),
           ('Prior to the Nazi takeover, the German government was known as the Weimar Republic.  Who or what is Weimar?',6),
           ('How many aircraft carriers did the Japanese destroy during their attack on Pearl Harbor?',6),
           ('Who was the commander of Germany''s Afrika Korps?',6),
           ('Which of the following is NOT a Winston Churchill speech?',6),
           ('When Japan surrendered in 1945, which of these cities were still under its control?',6);

Did the Germans ever capture Moscow?
Yes
No--

How did Hitler die?
Hanged after the trials of Nuremberg
Shot by the Russians
Suicide--
No one knows
      
     
Which of these countries did NOT fight in WWII?
Finland
Greece
Ireland--
Italy

What was the name of the American effort to build an atomic bomb?
The Baltimore Project
The Chicago Project
The Manhattan Project--
The Philadelphia Project

About 70 million people died as a result of WWII.  What percent of these people were from the United States?
0.6%--
5.6%
15.6%
30.6%

What was the role of Joseph Goebbels in the Nazi government?
Head of the Air Force
Head of the Navy
Minister of Propaganda--
Minister of War Production


What was the code name of the German invasion of the Soviet Union?
Operation Barbarossa--
Operation Overlord
Operation Sea Lion
Operation Torch

What machine did the Germans use to (unsuccessfully) encrypt their messages?
Boltzmann machine
Enigma machine--
Göring machine
Haber machine

What city's fall to the Japanese in 1942 caused 80,000 British and allied troops to be taken prisoner?
Bangkok
Mumbai
Shanghai--
Singapore

What country signed a non-aggression pact with Germany in August, 1939?
Finland
Soviet Union--
United Kingdom
Yugoslavia

Prior to the Nazi takeover, the German government was known as the Weimar Republic.  Who or what is Weimar?
An adjective meaning "peaceful"
A city--
A person
A treaty

How many aircraft carriers did the Japanese destroy during their attack on Pearl Harbor?
None--
1
4
10
    
Who was the commander of Germany's Afrika Korps?
Albert Kesselring
Erich Ludendorff
Erich von Manstein
Erwin Rommel--

Which of the following is NOT a Winston Churchill speech?
I have nothing to offer but blood, toil, tears and sweat
This was their finest hour
We have nothing to fear but fear itself--
We shall fight on the beaches

When Japan surrendered in 1945, which of these cities were still under its control?
Beijing
Seoul
Taipei
All of the above--

# Which One Doesn't Belong 7

insert into tbl_questions(Query,CategoryID)
    values 
    ('Historical people',7),
    ('U.S. cities',7),
    ('Historical leaders',7),
    ('Rock musicians',7),
    ('Languages',7),
    ('Islands',7),
    ('Cities',7),
    ('Music instruments',7),
    ('Painters',7),
    ('Singers',7),
    ('Movies',7),
    ('Japanese movies',7),
    ('Living things',7),
    ('Letters',7),
    ('British leaders',7),
    ('Anatomy',7),
    ('Words',7),
    ('Plays',7);
    


Historical people
Cervantes
Tolstoy
Michelangelo--
Dickens

U.S. cities
Sacramento
Minneapolis--
Raleigh
Austin
--Minneapolis is not a state capital</div>

Historical leaders
Rameses--
Augustus
Nero
Hadrian
      <div class='explanation'>Rameses was an Egyptian pharaoh, not a Roman emperor</div>
        
Rock musicians
Keith Moon--
Stevie Ray Vaughan
Eddie Van Halen
Eric Clapton
<div class='explanation'>Keith Moon played drums, not guitar</div>

Languages
Ukrainian
Polish
Russian
Hungarian--
<div class='explanation'>Hungarian is not a Slavic language</div>
Islands
Sumatra
Sulawesi
Mindanao--
Java
<div class='explanation'>Mindanao is part of the Philippines, not Indonesia</div>
Cities
Brisbane
Auckland--
Melbourne
Sydney
<div class='explanation'>Auckland is in New Zealand, not Australia</div>
Music instruments
Trombone
Tuba
French Horn
Clarinet--
<div class='explanation'>Clarinets are woodwinds, not brass instruments</div>
Painters
Degas
Monet
Renoir
Botticelli--
<div class='explanation'>Botticelli was not French and also not an impressionist</div>
Singers
Zayn Malik
Niall Horan
Harry Styles
Ed Sheeran--
<div class='explanation'>Ed Sheeran was not part of One Direction</div>

Movies
Carrie
The Hunt For Red October--
Cujo
The Shining
<div class='explanation'>"The Hunt for Red October" was written by Tom Clancy, not Stephen King</div>

Japanese movies
Spirited Away
Akira--
Ponyo
Princess Mononoke
<div class='explanation'>"Akira" is not by Studio Ghibli</div>

Living things
Coral--
Seagrass
Tree
Fern
<div class='explanation'>Coral is an animal, not a plant</div>

Letters
Psi
Mu
Aleph
Omicron
<div class='explanation'>Aleph is a Hebrew letter, not a Greek one</div>
        
British leaders
Sir Robert Peel
Earl Grey
William Gladstone
William Wilberforce--
<div class='explanation'>William Wilberforce was never Prime Minister</div>
Anatomy
Cochlea--
Retina
Iris
Pupil
<div class='explanation'>The cochlea is part of the ear, not part of the eye</div>
Words
Kayak
Civic
Benign--
Radar
<div class='explanation'>Benign is not a palindrome</div>
Plays
Hamlet
Twelfth Night
King Lear
Pygmalion--
<div class='explanation'>"Pygmalion" was written by George Bernard Shaw, not William Shakespeare</div>
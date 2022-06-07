
  use APIQuiz
  select * from tbl_answers;
  select * from tbl_categories;
  select * from tbl_questions order by QuestionID desc /*where CategoryID=5;*/
  select * from tbl_answers order by AnswerID desc 

  delete from tbl_answers where AnswerID=1004 
  delete from tbl_questions where QuestionID>1000 and QuestionID<1010


insert into tbl_answers(PosibleAnswer,QuestionID,Correct)
     values ('Hamlet',64,0),
            ('Twelfth Night',64,0),
            ('King Lear',64,0),
            ('Pygmalion',64,1);




  insert into tbl_categories(CategoryName) values ('Planets'),
  ('World War II'),('Which One Doesn''t Belong ');

  insert into tbl_questions(Query,CategoryID)
    values ('Which of these countries was NEVER part of the British Empire?',4),
           ('Which one of these cities is NOT in the Southern Hemisphere?', 4),
           ('Which one of these countries is NOT in Central America?',4),
           ('Which of these cities does NOT border the Great Lakes?',4),
           ('Which of these countries is NOT majority-Muslim?',4),
           ('Which of these countries is NOT recognized by the United Nations?',4),
           ('Which of these mountain ranges is NOT in Europe?',4),
           ('Which of these things is NOT located in Africa?',4),
           ('Which of these countries is NOT one of the top 20 oil producers?',4),
           ('Which of these cities is NOT in India?',4),
           ('Which of these countries does NOT have only one border?',4);


  insert into tbl_answers(PosibleAnswer,QuestionID,Correct)
    values ('Portugal',17,0),
           ('Ireland',17,0),
           ('Haiti',17,0),
           ('North Korea',17,1);

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
           ('Which planet appears to move most quickly across the sky, when observed from Earth?',5),
           ('Which planet has the most volcanoes, active or dormant?',5),
           ('Which planet was discovered by William Herschel in 1781?',5);


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
  /*
  Which of these U.S. states does NOT border Canada?
  Maine
  Minnesota
  Indiana
  Alaska

  Which of these countries was NOT a part of the Soviet Union?
  Belarus
  Ukraine
  Georgia
  Poland
   Which of these cities is NOT a national capital?
   Sydney
   Cairo
   Prague
   Bangkok
    Which of these cities DOESN'T border the Mediterranean Sea?
    Monaco
    Barcelona
    Lisbon
    Alexandria


    Which of these countries was NEVER part of the British Empire?
    Thailand
    Kenya
    Ireland
    New Zealand

    Which one of these cities is NOT in the Southern Hemisphere?
    Johannesburg
    Brisbane
    Colombo
    Brasilia

    Which one of these countries is NOT in Central America?
Belize
Honduras
Panama
Suriname

Which of these cities does NOT border the Great Lakes?
Toronto
Chicago
Pittsburgh
Cleveland

Which of these countries is NOT majority-Muslim?
Indonesia
Morocco
Albania
Ethiopia

Which of these countries is NOT recognized by the United Nations?
Iran
Israel
Taiwan
Cyprus

Which of these mountain ranges is NOT in Europe?
Carpathian Mountains
Atlas Mountains
The Pyrenees
The Alps

Which of these things is NOT located in Africa?
Lake Victoria
Aswan Dam
Zambezi River
Gobi Desert


Which of these countries is NOT one of the top 20 oil producers?
United States
Iraq
Norway
Morocco

Which of these cities is NOT in India?
Bangalore
Karachi
Chennai
Bhopal

Which of these countries does NOT have only one border?
Portugal
Ireland
Haiti
North Korea

  */

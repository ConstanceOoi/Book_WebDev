-- Create database
CREATE DATABASE bookstore;

USE bookstore;

-- Create book table
CREATE TABLE IF NOT EXISTS `book`(
	`id` int NOT NULL AUTO_INCREMENT,
    `isbn` varchar(13) NOT NULL UNIQUE,
    `title` varchar(256) NOT NULL,
    `synopsis` longtext NOT NULL,
    `category` varchar(20) NOT NULL,
    `author` varchar(60) NOT NULL,
    `publisher` varchar(60) NOT NULL,
    `price` decimal(5,2) NOT NULL,
    `publishYear` year(4) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Insert data into book table
INSERT INTO `book` (`isbn`, `title`, `synopsis`, `category`, `author`, `publisher`, `price`, `publishYear`) VALUES 
('9780316015844', 'Twilight (meyer novel)', 'Bella Swan moves from Phoenix, Arizona to live with her father in Forks, Washington to allow her mother to travel with her new husband, a minor league baseball player. After moving to Forks, Bella finds herself involuntarily drawn to a mysterious, handsome boy, Edward Cullen and eventually learns that he is a member of a vampire family which drinks animal blood rather than human blood.', 'Fiction', ' Stephenie Meyer', 'Little, Brown and Company', 9.49, 2005),
('9780316075657', 'Twilight: New Moon', 'I stuck my finger under the edge of the paper and jerked it under the tape. ''Shoot,'' I muttered when the paper sliced my finger. A single drop of blood oozed from the tiny cut. It all happened very quickly then. ''No!'' Edward roared ... Dazed and disorientated, I looked up from the bright red blood pulsing out of my arm - and into the fevered eyes of the six suddenly ravenous vampires.', 'Fiction', ' Stephenie Meyer', 'Little, Brown and Company', 9.49, 2006),
('9780316008259', 'Twilight: Eclipse ', 'Edward''s soft voice came from behind me. I turned to see him spring lightly up the porch steps, his hair windblown from running. He pulled me into his arms at once, and kissed me again. His kiss frightened me. There was too much tension, too strong an edge to the way his lips crushed mine - like he was afraid we had only so much time left to us. As Seattle is ravaged by a string of mysterious killings and a malicious vampire continues her quest for revenge, Bella once again finds herself surrounded by danger. In the midst of it all, she is forced to choose between her love for Edward and her friendship with Jacob - knowing that her decision has the potential to ignite the ageless struggle between vampire and werewolf. With her graduation approaching, Bella has one more decision to make: life or death. But which is which?', 'Fiction', 'Stephenie Meyer', 'Little, Brown and Company', 9.49, 2007),
('9780552772754', 'Shopaholic and Baby', 'Becky Brandon (née Bloomwood) is pregnant! She could not be more overjoyed – especially since discovering that shopping cures morning sickness. Everything has got to be perfect for her baby: from the designer nursery . . . to the latest, coolest pram . . . to the celebrity, must-have obstetrician. But when the celebrity obstetrician turns out to be her husband Luke glamorous, intellectual ex-girlfriend, Becky perfect world starts to crumble. She is shopping for two . . . but are there three in her marriage?', 'Fiction', 'Sophie Kinsella', 'Bantam Books', 9.47, 2007),
('9780440296539', 'Mini Shopaholic', 'Shopaholic Becky Brandon (née Bloomwood) two-year-old is ... spirited. She knows what she wants, whether it is a grown-up Prada handbag or a toy pony (40% off, so a bargain, surely?) When yet another shopping trip turns to mayhem, Becky decides it is time to give Minnie her own pocket money. Is it a bad sign when Minnie goes instantly overdrawn?', 'Fiction', 'Sophie Kinsella', 'Bantam Books', 9.48, 2010),
('9780008331658', 'PS I Love You', 'Holly and Gerry are a married couple who live in Dublin. They are deeply in love, but they fight occasionally. By winter that year, Gerry suddenly dies of a brain tumor and Holly realizes how much he means to her as well as how insignificant their arguments were. As the months pass, each new message fills her with encouragement and sends her on a new adventure. With Gerry''s words as her guide, Holly slowly embarks on a journey of rediscovery.', 'Fiction', 'Cecelia Ahern', 'HarperCollins Publishers', 8.79, 2004),
('9780749908928', 'Brighter than the Sun', 'When Charles Wycombe, the dashing and incorrigible Earl of Billington, toppled out of a tree and landed at Ellie''s feet, neither suspected that such an inauspicious meeting would lead to marriage. But Charles must find a bride before his thirtieth birthday or he''ll lose his fortune. And Ellie needs a husband or her father odious fiancée will choose one for her. And so they agree to wed, even though their match appears to have been made somewhere hotter than heaven ...', 'Fiction', 'Julia Quinn', 'HarperCollins Publishers', 6.80 ,1997),
('9780349404370', 'Perfect Kind of Trouble', 'Twenty-one-year-old Kayla Turner has lost everything. After spending most of her life taking care of her ailing mother, she just wants to spot a glimmer of light at the end of the tunnel. So when her late father-a man she barely knew-leaves her an inheritance, she finally breathes a sigh of relief . . . until she learns the inheritance comes with strings. Strings in the form of handsome playboy Daren Ackwood, her father protage. To see any of her inheritance, she is forced to team up with him. From his expensive car to those sexy dimples, Kayla seen his type before. But Daren is not who he seems to be . . .', 'Fiction', 'Chelsea Fine', 'Piatkus Books', 9.90 ,2014),
('9780373131037', 'Banished to the Harem', 'A black eye and a night in prison was not how Sheikh Rakhal Alzirz expected his latest fling to end, but it was worth it, for the pleasure of meeting his next conquest! His return to the throne imminent, Rakhal seizes the chance to discover if Natasha is as fiery between the sheets as her flaming red hair, but his recklessness has consequences.…', 'Fiction', 'Carol Marinelli', 'Harlequin Presents', 9.78, 2012),
('9780545341080', 'Thea Stilton and the Prince Emerald', 'Geronimo''s sister Thea Stilton narrates this tale packed with action, mystery, and friendship! When the Thea Sisters'' friend Ashvin is in trouble, they rush to his aid . . . in India! Ashvin has been bringing the monkeys that live in the big city back to their natural jungle environment. But the monkeys have suddenly started stealing jewels! Someone must be behind this terrible theft. Can the Thea Sisters solve the mystery?', 'Fiction', 'Thea Stilton', 'Scholastic Paperbacks', 6.52 ,2010);


-- Create user table
CREATE TABLE IF NOT EXISTS `user`(
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `email` varchar(60) NOT NULL UNIQUE,
    `phoneNo` varchar(15) NOT NULL,
    `address` varchar(60) NOT NULL,
    `birthDate` date NOT NULL,
    `password` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
); 

-- Insert data into user table
INSERT INTO `user` (`name`, `email`, `phoneNo`, `address`, `birthDate`, `password`) VALUES 
('Constance Ooi', 'constanceooi@gmail.com', '0899462020', 'Athlone', '2002-11-20', '1234'),
('Mary', 'mary@gmail.com', '0844562348', 'Dublin', '1998-12-16', 'abcd'),
('Christopher', 'christopher97@gmail.com', '0125789654', 'Cork', '1997-10-3', 'cb97');


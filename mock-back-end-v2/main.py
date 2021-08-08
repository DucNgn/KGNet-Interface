import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


dog_breed_query = """
  prefix ns1:<https: //www.dog_breeds.com/>
                   select ?breed_class ?breed_overview ?recommended_for ?breed_facts ?dog_image  ?min_height ?max_height ?min_weight ?max_weight ?level_of_obey ?min_response_count
               ?max_response_count  
                   where
                   {
                   ?s  ns1:img_folder_name ?breed_class.
                   ?s  ns1:height_low_inches ?min_height.
                   ?s  ns1:height_high_inches ?max_height.
                   ?s  ns1:weight_low_lbs ?min_weight.
                   ?s  ns1:weight_high_lbs ?max_weight.
                   ?s  ns1:obey  ?level_of_obey.
                   ?s  ns1:reps_lower ?min_response_count.
                   ?s  ns1:reps_upper ?max_response_count.
                   ?s  ns1:img1 ?dog_image.
                   optional {?s  ns1:recommended_for ?recommended_for
       }
                   optional {?s  ns1:breed_facts ?breed_facts
       }
                   optional {?s  ns1:breed_overview ?breed_overview
       }
                   filter( CONTAINS(?dog_class,?breed_class) )
                   {
                       select 
                       (sql:getDogBreed('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F09%2F22%2F50-cute-dog-names.jpg')) as ?dog_class
                       where
                       {}
       }
   }               
                   order by ?breed_class
                   limit 100
"""

breed_overview_076 = """The Golden Retriever is one of the world’s favourite dog breeds. Originally bred as gun dogs, the Golden Retriever is a smart, trainable and friendly companion. Because of their intelligence, they make great working dogs and can be seen performing a number of different roles including seeing-eye dogs, hearing dogs, hunting & detection dogs, and search and rescue dogs. Golden Retrievers are large, strong dogs with thick coats which repel water. There are three main types of Golden Retrievers, which have arisen due to the breed’s widespread popularity. The British type has a wider, shorter muzzle, shorter legs and tail, a deeper chest and a blockier forehead. British Golden Retrievers tend to be gold or cream, but never red, mahogany or white. American Golden Retrievers are taller than British ones, lankier, and less stocky. Canadian types have thinner, darker coats and are generally taller and leaner than other types. Puppies of all types usually have a very light coat which darkens over time. The breed has a double coat which sheds throughout the year but particularly around the change of the season. It has a thicker, water-repellent top coat and a soft undercoat to keep the dog cool in warmer months and warm in cooler months. Healthy male Golden Retrievers weigh between 29 and 34 kg on average and stand at about 58 – 61 cm tall. Females weigh in at 27 – 32 kg and stand at 55 – 57 cm tall. The average lifespan of a Golden Retriever is around 11-12 years"""
breed_facts_076 = """Gerald R. Ford, the 38th President of the USA owned a Golden Retriever called Liberty. It is said that if Ford wanted to end a conversation in the Oval Office he would signal the dog who would then greet the visitor, creating a break in the conversation. Golden Retrievers are great watch dogs but not great guard dogs, as they are friendly to everyone, even strangers. Celebrity Golden Retriever owners include Ben Affleck, Denise Richards, Andrew Garfield, Curtis Stone, Betty White, Jackie Chan, Oprah and Adam Levine. Golden Retrievers have starred in many films and television series, notably the Air Bud series, Homeward Bound, Pushing Daisies and the Aussie kids’ favourite, Napoleon. Despite the fact Golden Retrievers are physically mature by the age of 2, they still act like puppies until around 3 years of age – some act like puppies for their entire life! Golden Retrievers are “crepuscular” dogs, meaning they’re active in the morning and at night, but tend to sleep during a large portion of the day. They have very high pain tolerance, which makes them perfect for potentially dangerous jobs, e.g. police work, search & rescue and hunting. Their origin as hunting dogs make them great playmates, as they were bred to be able to seek and catch!"""

breed_overview_112 = """The smallest of the AKC's retrievers, the Nova Scotia Duck Tolling Retriever is intelligent, affectionate, and eager to please. Play fetch with a tireless Toller until your right arm falls off, and he will ask you to throw left-handed.
The little gundog with the big name is the smallest AKC retriever, standing ideally 18 or 19 inches at the shoulder. The Toller's trademark is a coat of stunning crimson, ranging from golden red to a dark coppery color, with white markings. Strong and agile, Tollers are medium dogs: medium in size, bone, and coat length. The almond-shaped eyes project an alert expression. Tollers are upbeat athletes who require outlets for their boundless vigor: hunting, hiking, camping, and, of course, swimming (for which they are ideally suited, down to their webbed feet). Tollers are smart, handsome, affectionate companions, but these red tornadoes can be recommended only to those with enough time and energy to keep them usefully occupied"""
breed_facts_112 = """The smallest of the AKC's retrievers, the Nova Scotia Duck Tolling Retriever is intelligent, affectionate, and eager to please. Play fetch with a tireless Toller until your right arm falls off, and he will ask you to throw left-handed. The little gundog with the big name is the smallest AKC retriever, standing ideally 18 or 19 inches at the shoulder. The Toller's trademark is a coat of stunning crimson, ranging from golden red to a dark coppery color, with white markings. Strong and agile, Tollers are medium dogs: medium in size, bone, and coat length. The almond-shaped eyes project an alert expression. Tollers are upbeat athletes who require outlets for their boundless vigor: hunting, hiking, camping, and, of course, swimming (for which they are ideally suited, down to their webbed feet). Tollers are smart, handsome, affectionate companions, but these red tornadoes can be recommended only to those with enough time and energy to keep them usefully occupied."""

breed_overview_096 = """The Labrador Retriever (known simply as the Labrador) is the most popular breed of dog in Australia, New Zealand, the UK, the USA and Canada. Bred originally as gun dogs, today’s Labrador is famous for its roles as assistance dogs for visually impaired and autistic people, detection & screening dogs, therapy dogs and law enforcement dogs. Labradors vary widely, but they are generally quite large and muscular with a short, dense, water-repellent coat, a broad head, brown or hazel eyes, strong jaws, a medium muzzle, and an “otter tail” which is thick at the base and narrower at the tip. There are three main colour varieties in Golden Retrievers: black, yellow, and chocolate, and occasionally all three can be present in the same litter. Average shedders, Labradors are easy to groom. It is recommended that they are brushed regularly with a firm bristle brush, especially in the undercoat, and are bathed only when necessary. Healthy male Labradors should weigh between 29 and 36 kg and stand at about 57 – 62 cm tall. Females should weigh about 25 – 32 kg and stand at 55 – 60 cm tall. Labradors are energetic dogs and therefore need to be taken on a long, brisk walk or jog at least once a day. They tend to gain weight quite easily, so exercise and a proper diet are especially important for the Labrador. Life expectancy in Labradors is around 10-13 years."""
breed_facts_096 = """Labradors have a high tolerance for pain, making them great working dogs. It is not until the age of 4 that Labradors are considered to be adults. A service dog named Endal, a Labrador from the UK, is honoured with the title of “the most decorated dog in the world”. He was awarded with the PDSA’s Gold Medal for Animal Gallantry and Devotion to Duty, which is the highest award that an animal can receive. Zanjeer, a Labrador from India, was a detection dog who helped the Mumbai Police during the 1993 Mumbai bombings and was given a full state funeral. An American Labrador named Jake was a search and rescue dog during the 9/11 attacks and Hurricane Katrina. Two Labradors, Lucky and Flo, were the first animals trained to detect optical discs by scent, and in their careers they sniffed out nearly 2 million pirated DVDs. Sarbi is an Australian explosives detection Labrador who was MIA for 14 months in Afghanistan but was rediscovered by an American soldier. She received an RSPCA Purple Cross Award in 2011. Bill Clinton, Prince William, Vladimir Putin, Denise Richards, Pamela Anderson and Hulk Hogan are all Labrador enthusiasts."""

breed_overview_016 = """The Beagle is member of the hound group of domesticated dogs and its ancestry can be dated back 2, 500 years. Similar in appearance to the Foxhound, the Beagle also has a very advanced sense of smell and were employed to track game like rabbits and deer. These days they are often employed by security and police forces to sniff out contraband and serve all over the world in this role. The name Beagle has been around since circa 1475. The modern breed of Beagle as we know them today was developed in the UK in the 1830s. The Beagle is a mix of a number of breeds, including: the Southern Hound, the North Country Beagle and the Talbot Hound. Although, like many breeds of dog, the Beagle was first developed for hunting purposes, they’re known for their gentle and even-tempered ways. With a reputation for being joyful and playful, the Beagle is a popular choice for young children. They are very excitable, however, and their advanced sense of smell can cause them all sorts of distractions whilst down the street or in the park so careful supervision is recommended. When in a home environment Beagles can become easily bored so stimulation through play time and regular exercise is a must. They can suffer from loneliness or separation anxiety also, so it’s important to give them plenty of human attention. While the Beagle isn’t demanding when it comes to exercise it’s a good idea to walk them as often as possible. Once or twice a day is great with the odd longer walk or run a good idea. The breed is prone to weight problems if not given enough exercise. Beagles are generally sized between 33 and 41 cm and weigh between 8 and 14 kgs. A happy and healthy Beagle will usually live to between 12 and 15 years of age."""
breed_facts_016 = """Snoopy from Peanuts is perhaps the world’s most famous Beagle. Humans have some 5 million scent receptors. Beagles have a rather impressive 220 million. It’s no wonder they’re employed as sniffer dogs the world over. The ship that Charles Darwin travelled on whilst compiling most of the specimens used for his book The Origin of Species was called HMS Beagle, named after the breed. Queen Elizabeth I and King James I both adored Beagles. Since then the breed has become synonymous with the idea of the ‘royal dog’, although Queen Elizabeth II is more of a Corgi lover. Former US President Lyndon Johnson owned a number of Beagles and was famously criticised for picking one up by the ears whilst greeting it on the Whitehouse lawn. You can tell a purebred Beagle by the white tip on its tail. Some 8,    018 dogs were used for animal testing in the UK in 2004. Of this number, 7, 779 were Beagles. They are favoured for their small build and passive temperament. Barry Manilow’s Beagle, ‘Bagel’ was featured on a number of his album covers. On his 1975 album ‘Tryin’ to Get a Feeling’, he was pictured wearing a ‘I LOVE BEAGLES’ t-shirt."""

breed_overview_061 = """The Irish Setter, also known as the Red Setter, is a large sporting dog that can live up to 14 years. The Setter’s long and feathery coat is mahogany or rich chestnut in colour. This breed tends to not shed as much hair as you might think. It is recommended to brush your Irish Setter every couple of days if you wish to maintain the dog’s reputation for perfect, tangle-free hair. Irish Setters require a significant level of exercise due to their high levels of energy and the need to explore unseen areas. Taking them on one or several walks a day is recommended, because they do not enjoy being confined and can become bored and destructive. Female Setters can grow as tall as 63 cm and males can grow up to 70 cm. Males weigh from 29 to 34 kilos and females weigh between 25-29 kilos."""
breed_facts_061 = """An Irish national bus company called Bus Éireann uses the Irish Setter as their logo Irish Setters can keep their “puppy brain” their whole lives. Irish setting can be used as show dogs or hunting dogs according to their size. Three US Presidents have owned Irish Setters including Harry Truman, Ronald Reagan and Richard Nixon."""

shap_Description = "Red pixels contribute more to class while Blue pixels contribute more against the class"


@app.get("/KGNet/getDogBreedInfo")
def getDogBreedInfo():
    return {
        "Query": dog_breed_query,
        "QueryKeywords": "select,from,where,filter,group by,order by,sql:getDogBreed",
        "SHAPFigure": "https://i.ibb.co/vmd4VZC/SHAP-Explain-cute-dog.png",
        "SHAPDescription":shap_Description,
        "result": [
            {
                "breed_class": "076.Golden_retriever",
                "breed_overview": breed_overview_076,
                "recommended_for": "Families",
                "breed_facts": breed_facts_076,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/golden-retriever-700x700.jpg",
                "min_height": "21.0",
                "max_height": "24.0",
                "min_weight": "55",
                "max_weight": "75",
                "level_of_obey": "0.95",
                "min_response_count": "1",
                "max_response_count": "4.0",
                "SHAPFigure": "https://i.ibb.co/4p90qXG/SHAP-Eplain-golden-retriever-700x700.png",
                "SHAPDescription": shap_Description,
            },
            {
                "breed_class": "112.Nova_scotia_duck_tolling_retriever",
                "breed_overview": breed_overview_112,
                "recommended_for": "",
                "breed_facts": breed_facts_112,
                "dog_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Female_Nova_Scotia_Duck_Tolling_Retriever.jpg/1200px-Female_Nova_Scotia_Duck_Tolling_Retriever.jpg",
                "min_height": "18.0",
                "max_height": "21.0",
                "min_weight": "41",
                "max_weight": "56",
                "level_of_obey": "0.6",
                "min_response_count": "26",
                "max_response_count": "42.5",
                "SHAPFigure": "https://i.ibb.co/y0kV8tx/SHAP-Explain-Female-Nova-Scotia-Duck-Tolling-Retriever.png",
                "SHAPDescription": shap_Description,
            },
            {
                "breed_class": "096.Labrador_retriever",
                "breed_overview": breed_overview_096,
                "recommended_for": "Families",
                "breed_facts": breed_facts_096,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/chocolate-labrador-700x700.jpg",
                "min_height": "21.0",
                "max_height": "24.0",
                "min_weight": "55",
                "max_weight": "80",
                "level_of_obey": "0.95",
                "min_response_count": "1",
                "max_response_count": "4.0",
                "SHAPFigure": "https://i.ibb.co/0Z5qXGV/SHAP-Explain-chocolate-labrador-700x700.png",
                "SHAPDescription": shap_Description,
            },
            {
                "breed_class": "016.Beagle",
                "breed_overview": breed_overview_016,
                "recommended_for": "Families (great with small children)",
                "breed_facts": breed_overview_016,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/beagle-700x700.jpg",
                "min_height": "13.0",
                "max_height": "16.0",
                "min_weight": "18",
                "max_weight": "30",
                "level_of_obey": "0.6",
                "min_response_count": "81",
                "max_response_count": "100.0",
                "SHAPFigure": "https://i.ibb.co/vZ8v51k/SHAP-Explain-beagle-700x700.png",
                "SHAPDescription": shap_Description,
            },
            {
                "breed_class": "061.English_cocker_spaniel",
                "breed_overview": breed_overview_061,
                "recommended_for": "Families",
                "breed_facts": breed_overview_061,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/Irish-setter-sitting-700x700.jpg",
                "min_height": "23.0",
                "max_height": "27.0",
                "min_weight": "45",
                "max_weight": "80",
                "level_of_obey": "0.7",
                "min_response_count": "16",
                "max_response_count": "15",
                "SHAPFigure": "https://i.ibb.co/drLRfNk/SHAP-Explain-Irish-setter-sitting-700x700.png",
                "SHAPDescription": shap_Description,
            },
        ],
    }


"""
    NOTE: The below region is for dog similarity request.
"""

dog_similar_query = """
prefix ns1:<https: //www.dog_breeds.com/>
                select ?breed_class ?breed_overview ?recommended_for ?breed_facts ?dog_image  ?min_height ?max_height ?min_weight ?max_weight ?level_of_obey ?min_response_count 
                ?max_response_count                 
                (sql:getDogSimilarityScore(?dog_image,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F09%2F22%2F50-cute-dog-names.jpg')) as ?Score 
                where
                {
                ?s  ns1:img_folder_name ?breed_class.
                ?s  ns1:height_low_inches ?min_height.
                ?s  ns1:height_high_inches ?max_height.
                ?s  ns1:weight_low_lbs ?min_weight.
                ?s  ns1:weight_high_lbs ?max_weight.
                ?s  ns1:obey  ?level_of_obey.
                ?s  ns1:reps_lower ?min_response_count.
                ?s  ns1:reps_upper ?max_response_count.
                ?s  ns1:img1 ?dog_image.
                optional {?s  ns1:recommended_for ?recommended_for
        }
                optional {?s  ns1:breed_facts ?breed_facts
        }
                optional {?s  ns1:breed_overview ?breed_overview
        }
    }  
                order by DESC(xsd:float(?Score))
                limit 100
            


"""

breed_overview_051 = """The Chow Chow is a medium-sized, sturdy dog with small pointed ears and a very thick coat of long fur. Believed to have originated from Mongolia or Siberia, the Chow Chow is reckoned to be the domesticated breed with the closest DNA link to wolves. The ancient Chinese bred the Chow Chow as a multi-purpose work dog to fulfil the roles of hunting, herding, companion and war dog. Chow Chows were also used to pull sleds and even bred and farmed for human consumption. It was thought that a Chinese emperor once owned over 5,000 Chow Chows for the purposes of war. Although originally bred as working dogs, Chow Chows are not especially aggressive or energetic. They are quite happy to be kept to smaller dwellings such as apartments or townhouses but require a walk at least daily. The breed are quite good with children and are very loyal to their owners, but have developed a reputation for being over protective of territory, possessions and specific family members. Personality will vary between individual animals, but many Chow Chows show suspicion and sometimes aggression towards strangers. Chow Chows come in a variety of colours, including black, blue, red faun and white coats. They have a distinctive curly tail that stands up and aligns with their backs. Another characteristic hallmark of the breed is the blue coloured lips and black tongue. Chow Chows are very popular show dogs and the American Kennel Club registers some 10,000 examples each year. Many have compared the temperament of the Chow Chow to cats. They are very independent dogs, don’t need a lot of human contact, and are quite happy to lounge around in a small and comfortable space. A Chow Chow grows to about 43 to 50 cm and should weigh between 25 to 32 kgs. A healthy Chow Chow will generally live to between 9 and 12 years of age."""
breed_facts_051 = """If the Chow Chow’s face looks familiar, it’s because that many have seen a similarity between the appearance of the breed and the classic teddy bear. There is a legend that teddy bears are modelled after Queen Victoria’s Chow Chow. The story goes that she had a dress maker produce a doll in its image after being told that as the Queen of England, she couldn’t be seen associating with a dog in public. When the Chow Chow first arrived in England it was put on show at the London Zoo. There it had a plaque labelling it the ‘Wild Dog of China’. Chow Chows are notoriously difficult to train. Some owners believe that they are beyond training. They were used for centuries as herders and hunting dogs, however, so a strong-willed master is a must if a Chow is ever going to behave. The influential psychologist Sigmund Freud famously owned a Chow Chow. After he died, his daughter Anna collected a few more Chows to the pack."""

breed_overview_035 = """The Cocker Spaniel is a medium-sized, long-haired dog that originated in the UK as hunting dogs. There are two breeds of Cocker Spaniels: the American Cocker Spaniel and the English Cocker Spaniel. The English Cocker Spaniel has a long, silky coat which is usually straight or slightly wavy, and its legs, chest and belly are covered in longer hair called “feathering”. The Cocker Spaniel does require a lot of grooming and is an average shedder. Its coat is either a solid colour (usually black, light cream, red or brown) or multi-coloured (one of the previously mentioned colours mixed with white). The American Cocker Spaniel tends to be smaller with a shorter back, shorter muzzle and a domed head. The average weight of the Cocker Spaniel is between 13 and 15 kg, with males standing at 38 cm tall and females at 36 cm. Like most dogs, Cocker Spaniels love exercise and will take as much as you can give them. Usually a daily walk and a couple of hours of playtime are sufficient."""
breed_facts_035 = """An American Cocker Spaniel named Obo is considered to be the father of the breed we see today. The Duke and Duchess of Cambridge William & Kate adopted a cocker spaniel named Lupo in 2012. “Lady” in the Disney film Lady and the Tramp was a Cocker Spaniel Cocker Spaniels have been popular with US presidents, with Richard Nixon, Harry Truman, JFK and Bill Clinton all owning them. Between 1936 and 1952, the American Cocker Spaniel was the most popular dog in the USA. That’s a record of 16 years, unmatched by no other breed. The most common cause of death in Cocker Spaniels is cancer, followed closely by old age. Studies have shown that Cocker Spaniels help lower high blood pressure, making them great pets for people in stressful jobs. Famous Cocker Spaniel owners have included Bing Crosby, Brittany Murphy, Charlize Theron, Oprah Winfrey, Lauren Bacall and Naomi Watts"""

breed_overview_006 = """The American Foxhound is, as its name suggests, a hunting dog bred in the USA to hunt foxes and other game. A scenting pack hound, she has tremendous hunting instincts, a keen sense of smell and great energy to run effortlessly for many hours on the chase. She is known for her speed, endurance and work ethic. When hunting, she works with a pack of likeminded foxhounds who track quarry along with hunters, who usually follow on horseback. The American Foxhound’s sleek, rangy body is well balanced, powerful and clean cut. With longer, leaner and more finely boned legs than her cousin, the English Foxhound, her loin (back end) is slightly arched, allowing her a greater speed and agility over rough terrain. At maturity, the breed reaches a height of 58 to 64 cm and a weight of 27 to 32 kg. Her face is characterised by her large, soft brown eyes, set well apart, and her expression is described as gentle and pleading. She has a short, hard coat lying close to her body that is usually a tricolour of black, white and tan. The coat’s hard texture protects her from the underbrush she courses through while on the hunt and is easy to take care of, requiring merely a short, once-a-week grooming session and bathing only when absolutely necessary. Although grooming her is easy, taking care of some of an American Foxhound’s other needs can be much more challenging! Bred specifically to spend long hours chasing after prey, she needs LOTS of daily exercise, or she can quickly become depressed or destructive (or both). She really does require a very active owner, such as a long-distance runner or hiker, a frequent hunter, or a dog sport enthusiast. Additionally, she has a single-minded prey drive that needs careful management – and to be kept on the leash when out and about – as well as a large, securely fenced-in yard in which to run loose. The American Foxhound is definitely not suited to apartment life or even to urban environments. With voice generously described as ‘melodious’ when on the trail, her loud baying and bawling can be extremely disturbing to neighbours within earshot. She is most suited to country living, where her activity needs can be more easily met, and her daily concerts won’t disturb neighbours. Despite this, she is not an outdoor dog; rather, she loves being indoors with her human companions or hanging out with other dogs – after all, she is very much a pack animal."""
breed_facts_006 = """Along with eight other breeds, the American Foxhound was recognised by the American Kennel Club in 1886, shortly after that organisation’s establishment. The American Foxhound was bred to chase a fox, but not to kill it. She has always worked closely alongside horses. She is taller and more streamlined than the English Foxhound. Her tail has a very slight brush, meaning that it’s heavy with hair. The American Foxhound is the state dog of Virginia."""

breed_overview_004 = """The Akita is distinctive large and powerful dog with an aloof attitude.  The Akita can be territorial and the dog is not usually welcoming of strangers. They are double coated dogs and their undercoat is thick and warm, coupled with short top coat. These dogs are considered to be heavy shedders which mean they not only shed twice a year but they also drop hair regularly right throughout the year. There are two breeds of Akita; the Japanese Akita which is white, red or brindle and the American Akita which comes in a wide variety of colours including black, black brindle, blue brindle, brown, brown brindle, brindle, fawn and fawn brindle. The Japanese Akita is known as the ‘Akita Inu’ or ‘Japanese Akita’ and the American bloodline is known as the ‘Akita’ or ‘American Akita. Male Akitas weigh from 38 to 54 kg and females weigh 34 to 50 kilos.  Male Akitas stand about 61 to 71 cm and females stand from 61 to 66 cm. The average lifespan of an Akita is 11 to 15 years."""
breed_facts_004 = """There was an Akita in Japan who went to the station with his master every day and waited for his master to return from work in the same spot. When his master went on the train one day and died he did not return but the dog Hachi-ko continued to go to the station for 12 years.  When Hachi-ko died the Japanese erected a bronze statue of him."""

breed_overview_106 = """The Newfoundland is a giant, very muscular, strong dog that is equipped with a heavy double coat of fur. Originally developed in Canada as a working dog and companion to fisherman, the Newfoundland is a stoic and even-tempered breed, known for its excellent swimming capabilities and brave, loyal nature. Newfoundlands are closely related to the mastiff dogs like the English Mastiff and the St. Bernard and share the physical characteristics that are hallmarks of these breeds; thick bones, a strong muscular build and big bull-like heads. The breed originated from the island of Newfoundland and is a descendent of the indigenous St. John’s Dog. It is believed that the mastiff characteristics were introduced by mating with the dogs of Portuguese fisherman who once frequented the island. The Newfoundland’s origins as a trusty work companion has developed some very attractive qualities in the dog. Newfoundlands have the reputation for enjoying human contact, being mindful and patient with children, and showing a great deal of loyalty towards their family. Because of their early work as a fisherman’s dog, the Newfoundland is a remarkably competent swimmer and has a solid reputation for carrying out daring rescue missions in freezing cold and wild ocean conditions. While the Newfoundland is known for its docile temperament, it is a very large and strong animal. Although they have a wonderful reputation with children, their size and weight means that they can accidently hurt a small child who positions themselves in the wrong place at the wrong time. The Newfoundland measures an impressive 69 to 74cm and generally weighs between 65 to 69kgs. Newfoundlands live to between the ages of 8 and 10 years."""
breed_facts_106 = """Napoleon Bonaparte had a Newfoundland called Henri that was always by his side even on the battlefield. In the United Kingdom a Newfoundland called Whizz works with the Royal Navy Reservists’ Swansea to rescue people from the ocean. Newfoundlands have webbed feet and that helps them to be such great swimmers."""

breed_overview_056 = """The Dachshund is a small long dog with muscular short legs.  There are three varieties of Dachshunds including shorthaired, wirehaired and longhaired and each of these varieties do shed.  They have a long muzzle and almost shaped eyes that can either be dark red or black-brown. The short-haired Dachshund’s coat is sleek and shiny and Dachshunds can come in a variety of colours including red or cream, black and chocolate, dapple, sable, piebald, brindle, and wild boar. Short-haired Dachshunds are usually black, chocolate, wild boar, grey or fawn with tan or cream markings. The Dachshund or Doxie as it is affectionately known, is a loveable dog with a bright personality.  The Dachshund breed is also commonly referred to as the Sausage Dog due to its long body. Dachshunds love nothing better than curling up under a blanket with their owners and they also love the company of other dogs, especially another Dachshund puppy.  They also make great watchdogs. The Dachshund weighs about 4.9 kilos at the age of 12 months and they stand at about 20 to 27 cms. Dachshunds have an average lifespan of 14 to 16 years."""
breed_facts_056 = """Dachshunds can suffer from slipped discs so don’t let them jump from high places. Like a lot of small dogs, Dachshunds have big attitudes and can be a bit stubborn. The oldest Dachshund recorded lived to 23 years old. The nickname in Australia for the Dachshund is the ‘sausage dog’. Dachshunds can tend to put on weight so it’s good to make sure they have a healthy diet and plenty of exercise"""

breed_overview_091 = """The lesser-known Japanese Spitz has a very famous smaller cousin – the Pomeranian. Like the Pomeranian, the Japanese Spitz has a light, fluffy coat that stands off its lightweight body. However, while the Pomeranian comes in a variety of colours, the Japanese Spitz is only white. The Japanese breed features stand-up prick ears that are triangular in shape and a pointed muzzle. What’s most impressive about this breed is its deep, dark and expressive eyes. The dog’s long furry tail usually curls up and over its body to give the breed an attentive look. The Japanese Spitz tends to stay on alert. If their senses are triggered, they can show a lot of bravery and are capable of barking off strangers, though they will calm quickly around trusted humans. This active dog loves human attention and tends to be very loyal and affectionate. Decades of breeding German Spitz dogs with other white Spitz breeds around the world meticulously teased out these desirable traits in Japan. Standards for the Japanese Spitz vary across the world’s kennel clubs, especially when it comes to size, so it’s important to understand your Japanese Spitz’s country of origin. But, no matter how you define the breed, the popularity of the Japanese Spitz is growing around the globe. The Japanese Spitz is a great dog for a first-time owner. They are relatively low maintenance, as one walk a day and some play time can keep them happy. This fluffy breed also tends to live a long and healthy life, and is therefore one of the least expensive breeds to insure. This family dog has a positive temperament, is incredibly smart, and responds very well to positive reinforcement training. Japanese Spitzes tends to get along well with other animals and children alike. And due to the breed’s high intelligence, the Japanese Spitz will do its best to protect the family from potential ne’er-do-wells. Different kennel clubs list varying sizes for this breed, but you can expect the dog to stand 25 to 35 cm in height while weighing 5 to 9 kg. Males tend to be slightly larger than females. The dog’s illustriously white coat is very easy to maintain. The Japanese Spitz has an overcoat and an undercoat of fur. The slightly rougher overcoat brushes off dirt while the undercoat contains protective oils. This means that the dog maintains its natural white lustre without much maintenance whatsoever."""
breed_facts_091 = """The Japanese Spitz boomed in popularity during the 1950’s. This was especially true in Japan, but the breed began to gain popularity worldwide in the 50’s. Worldwide organisations categorise the breed differently. The Australian, Canadian and New Zealand kennel clubs categorise the Japanese Spitz in the non-sporting group. The UK places the Japanese Spitz into the utility category, and the United Kennel Club puts the dog into the Northern Breeding Group. The United States does not recognise the Japanese Spitz as its own breed. Instead, the US lumps the Japanese Spitz in with the American Eskimo Dog due to physical similarities. The American Eskimo Dog was also bred on the North American Continent. The Japanese Spitz prefers warmth despite its fluffy coat. While the dog can tolerate the cold, the Japanese Spitz much prefers to be indoors during the winter months. This makes for a great house dog. There is no variation in colour with the Japanese Spitz. Each and every dog is pure white with an overcoat and an undercoat. The overcoat stands a bit taller and is a bit rougher than the incredibly soft undercoat. That fluffy coast is actually easy to maintain. The all-white fur of the Japanese Spitz contains oils that repel dirt. That means the dog maintains a beautiful sheen with very little maintenance."""


@app.get("/KGNet/getDogSimilarTo")
def getDogSimilarTo():
    return {
        "Query": dog_similar_query,
        "QueryKeywords": "select,from,where,filter,group by,order by,sql:getDogSimilarityScore",
        "SHAPFigure":"https://i.ibb.co/vmd4VZC/SHAP-Explain-cute-dog.png",
        "SHAPDescription":shap_Description,
        "result": [
            {
                "breed_class": "",
                "breed_overview": "",
                "recommended_for": "",
                "breed_facts": "",
                "dog_image": "",
                "min_height": "",
                "max_height": "",
                "min_weight": "",
                "max_weight": "",
                "level_of_obey": "",
                "min_response_count": "",
                "max_response_count": "",
                "SHAPFigure": "",
                "SHAPDescription": "",
            }
        ],
        "result": [
            {
                "breed_class": "076.Golden_retriever",
                "breed_overview": breed_overview_076,
                "recommended_for": "Families",
                "breed_facts": breed_facts_076,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/golden-retriever-700x700.jpg",
                "min_height": "21.0",
                "max_height": "24.0",
                "min_weight": "55",
                "max_weight": "75",
                "level_of_obey": "0.95",
                "min_response_count": "1",
                "max_response_count": "4.0",
                "SHAPFigure": "https://i.ibb.co/4p90qXG/SHAP-Eplain-golden-retriever-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.659062038265012",
            },
            {
                "breed_class": "112.Nova_scotia_duck_tolling_retriever",
                "breed_overview": breed_overview_112,
                "recommended_for": "",
                "breed_facts": breed_facts_112,
                "dog_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Female_Nova_Scotia_Duck_Tolling_Retriever.jpg/1200px-Female_Nova_Scotia_Duck_Tolling_Retriever.jpg",
                "min_height": "18.0",
                "max_height": "21.0",
                "min_weight": "41",
                "max_weight": "56",
                "level_of_obey": "0.6",
                "min_response_count": "26",
                "max_response_count": "42.5",
                "SHAPFigure": "https://i.ibb.co/y0kV8tx/SHAP-Explain-Female-Nova-Scotia-Duck-Tolling-Retriever.png",
                "SHAPDescription": shap_Description,
                "Score": "0.654062038265012",
            },
            {
                "breed_class": "061.English_cocker_spaniel",
                "breed_overview": breed_overview_061,
                "recommended_for": "Families",
                "breed_facts": breed_overview_061,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/Irish-setter-sitting-700x700.jpg",
                "min_height": "23.0",
                "max_height": "27.0",
                "min_weight": "45",
                "max_weight": "80",
                "level_of_obey": "0.7",
                "min_response_count": "16",
                "max_response_count": "25",
                "SHAPFigure": "https://i.ibb.co/drLRfNk/SHAP-Explain-Irish-setter-sitting-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.345377093248019",
            },
            {
                "breed_class": "051.Chow_chow",
                "breed_overview": breed_overview_051,
                "recommended_for": "Singles, small families",
                "breed_facts": breed_facts_051,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/chow-chow-700x700.jpg",
                "min_height": "19.0",
                "max_height": "22.0",
                "min_weight": "45",
                "max_weight": "55",
                "level_of_obey": "0.6",
                "min_response_count": "81",
                "max_response_count": "100",
                "SHAPFigure": "https://i.ibb.co/dGkhMsQ/SHAP-Explain-chow-chow-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.33095597656106",
            },
            {
                "breed_class": "035.Boykin_spaniel",
                "breed_overview": breed_overview_035,
                "recommended_for": "Singles, families",
                "breed_facts": breed_facts_035,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/cocker-spaniel-700x700.jpg",
                "min_height": "18.0",
                "max_height": "21.0",
                "min_weight": "41",
                "max_weight": "56",
                "level_of_obey": "0.6",
                "min_response_count": "26",
                "max_response_count": "42.5",
                "SHAPFigure": "https://i.ibb.co/tYMbgjw/SHAP-Explain-cocker-spaniel-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.32869705692744",
            },
            {
                "breed_class": "006.American_eskimo_dog",
                "breed_overview": breed_overview_006,
                "recommended_for": "Active sports lovers, game hunters, rural environment",
                "breed_facts": breed_facts_006,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2021/02/shutterstock_1444833281-American-Foxhound-in-a-public-park-thumbnail-Bow-Wow-Meow-Pet-Insurance.jpg",
                "min_height": "22.0",
                "max_height": "25.0",
                "min_weight": "65",
                "max_weight": "70",
                "level_of_obey": "0.5",
                "min_response_count": "26",
                "max_response_count": "40",
                "SHAPFigure": "https://i.ibb.co/cXYKS0v/SHAP-Explain-shutterstock-1444833281-American-Foxhound-in-a-public-park-thumbnail-Bow-Wow-Meow-Pet-I.png",
                "SHAPDescription": shap_Description,
                "Score": "0.306811044328243",
            },
            {
                "breed_class": "004.Akita",
                "breed_overview": breed_overview_004,
                "recommended_for": "Small families, singles (wary of strangers)",
                "breed_facts": breed_facts_004,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/akita-700x700.jpg",
                "min_height": "26.0",
                "max_height": "28.0",
                "min_weight": "80",
                "max_weight": "120",
                "level_of_obey": "0.5",
                "min_response_count": "26",
                "max_response_count": "40",
                "SHAPFigure": "https://i.ibb.co/JkvQvhv/SHAP-Explain-akita-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.299909783336673",
            },
            {
                "breed_class": "096.Labrador_retriever",
                "breed_overview": breed_overview_096,
                "recommended_for": "Families",
                "breed_facts": breed_facts_096,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/chocolate-labrador-700x700.jpg",
                "min_height": "21.0",
                "max_height": "24.0",
                "min_weight": "55",
                "max_weight": "80",
                "level_of_obey": "0.95",
                "min_response_count": "1",
                "max_response_count": "4.0",
                "SHAPFigure": "https://i.ibb.co/0Z5qXGV/SHAP-Explain-chocolate-labrador-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.296370022252958",
            },
            {
                "breed_class": "106.Newfoundland",
                "breed_overview": breed_overview_106,
                "recommended_for": "Families",
                "breed_facts": breed_facts_106,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/newfoundland-black-700x700.jpg",
                "min_height": "26.0",
                "max_height": "28.0",
                "min_weight": "100",
                "max_weight": "150",
                "level_of_obey": "0.7",
                "min_response_count": "16",
                "max_response_count": "25",
                "SHAPFigure": "https://i.ibb.co/Gp6BJfD/SHAP-Explain-newfoundland-black-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.294724291495259",
            },
            {
                "breed_class": "056.Dachshund",
                "breed_overview": breed_overview_056,
                "recommended_for": "Singles, families",
                "breed_facts": breed_facts_056,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/dachshund-standard-700x700.jpg",
                "min_height": "7.0",
                "max_height": "10.0",
                "min_weight": "16",
                "max_weight": "32",
                "level_of_obey": "0.5",
                "min_response_count": "26",
                "max_response_count": "40",
                "SHAPFigure": "https://i.ibb.co/jJ0XrKD/SHAP-Explain-dachshund-standard-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.29029524267053",
            },
            {
                "breed_class": "091.Japanese_chin",
                "breed_overview": breed_overview_091,
                "recommended_for": "Families",
                "breed_facts": breed_facts_091,
                "dog_image": "https://bowwowinsurance.com.au/wp-content/uploads/2019/01/japanese-spitz-isolated-white-background-thumb-700x700.jpg",
                "min_height": "8.0",
                "max_height": "11.0",
                "min_weight": "4",
                "max_weight": "11",
                "level_of_obey": "0.3",
                "min_response_count": "41",
                "max_response_count": "80",
                "SHAPFigure": "https://i.ibb.co/L1t9wtV/SHAP-Explain-japanese-spitz-isolated-white-background-thumb-700x700.png",
                "SHAPDescription": shap_Description,
                "Score": "0.27662592979247",
            },
        ],
    }


"""
    NOTE: The below region is for company similarity request.
"""

forbes2013Query = """
  prefix ns1: <https: //www.forbes.com/> 
                    select * where
                    {
        {
                            select ?name ?brief ?Logo ?employees_count ?Market_Value_class  ?Sales ?Profits
                             ((sql:getCompanySimilarity('Google',?name,'DistMult')) As ?Score)where
                            {
                            ?s ns1:has_type ns1:Company.
                            ?s ns1:has_label ?name.
                            ?s ns1:has_Country ?cont.
                            ?s ns1:has_Sales   ?Sales.
                            ?s ns1:has_Profits ?Profits.
                            ?s ns1:has_Assets ?Assets.
                            ?cont ns1:has_label ?cont_label.
                            ?s ns1:has_Industry ?indst.
                            ?s ns1:has_DBpedia_URI ?uri.
                            ?s ns1:has_Market_Value_class ?Mclass.
                            ?Mclass ns1:has_label ?Market_Value_class.
                            ?s ns1:has_Des ?brief.
                            ?s ns1:has_Logo ?Logo.
                            ?s ns1:has_employees_count ?employees_count.
                            
                            filter(?name !='Google')
            }
        }
                        filter(?Score >= -1)
    }
                    order by DESC(?Score) ?class ?Market_Value_class 
"""

company_shap_description = "Company rank contributes more to target class"


@app.get("/KGNet/getForbes2013SimilarCompanies")
def getForbes2013SimilarCompanies():
    return {
        "Query": forbes2013Query,
        "QueryKeywords": "select,from,where,filter,group by,order by,sql:getCompanySimilarity",
        "SHAPFigure":"https://i.ibb.co/Ns1pV1M/Google-MV-explaination.png",
        "SHAPDescription":company_shap_description,
        "result": [
            {
                "name": "IBM",
                "brief": "American multinational technology and consulting corporation",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
                "employees_count": "352600",
                "Market_Value_class": "high",
                "Sales": "104.5",
                "Profits": "16.6",
                "Score": "0.728150904178619",
                "SHAPFigure": "https://i.ibb.co/HHhH9yD/IBM-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Coca-Cola",
                "brief": "Mexican multinational beverage company. It operates the largest independent Coca-Cola bottling group in the world.",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Coca-Cola_Femsa_Logo.png",
                "employees_count": "86200",
                "Market_Value_class": "high",
                "Sales": "48.0",
                "Profits": "9.0",
                "Score": "0.603717684745789",
                "SHAPFigure": "https://i.ibb.co/GWnfv7K/Cocacola-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "PepsiCo",
                "brief": "soft drink company",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/a/a6/PepsiCo_logo.svg",
                "employees_count": "264000",
                "Market_Value_class": "high",
                "Sales": "65.5",
                "Profits": "6.2",
                "Score": "0.586369276046753",
                "SHAPFigure": "https://i.ibb.co/2Wjpyt8/Pepscico-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "United_Technologies",
                "brief": "Indian multinational corporation",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/5/5b/KPIT_Technologies_New_Brand_Visual_Identity_2019.png",
                "employees_count": "0.0",
                "Market_Value_class": "high",
                "Sales": "57.7",
                "Profits": "5.1",
                "Score": "0.567703068256378",
                "SHAPFigure": "https://i.ibb.co/2Wjpyt8/Pepscico-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Intel",
                "brief": "American semiconductor chip manufacturer",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Intel_logo_%282020%2C_light_blue%29.svg",
                "employees_count": "110800.0",
                "Market_Value_class": "high",
                "Sales": "53.3",
                "Profits": "11.0",
                "Score": "0.561813116073608",
                "SHAPFigure": "https://i.ibb.co/JkkQwHg/Intel-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Marathon_Petroleum",
                "brief": "American petroleum refining, marketing, and transportation company",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Marathon_Oil_Logo.svg",
                "employees_count": "0.0",
                "Market_Value_class": "mid",
                "Sales": "76.5",
                "Profits": "3.4",
                "Score": "0.556420266628265",
                "SHAPFigure": "https://i.ibb.co/RhYhns5/United-Tech-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Ford_Motor",
                "brief": "Vehicle manufacturing company based in Changping, Beijing, China",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg",
                "employees_count": "0.0",
                "Market_Value_class": "high",
                "Sales": "134.3",
                "Profits": "5.7",
                "Score": "0.556008458137512",
                "SHAPFigure": "https://i.ibb.co/RhYhns5/United-Tech-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "General_Motors",
                "brief": "automotive manufacturing corporation based in Detroit, Michigan, USA",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/b/b0/General_Motors_%282021%29.svg",
                "employees_count": "164000.0",
                "Market_Value_class": "high",
                "Sales": "152.3",
                "Profits": "6.2",
                "Score": "0.550354182720184",
                "SHAPFigure": "https://i.ibb.co/RhYhns5/United-Tech-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Comcast",
                "brief": "American mass media company",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Comcast_Logo.svg",
                "employees_count": "0.0",
                "Market_Value_class": "high",
                "Sales": "62.6",
                "Profits": "6.2",
                "Score": "0.545317709445953",
                "SHAPFigure": "https://i.ibb.co/RhYhns5/United-Tech-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
            {
                "name": "Facebook",
                "brief": "American social media and technology company",
                "Logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png",
                "employees_count": "44942.0",
                "Market_Value_class": "high",
                "Sales": "5.1",
                "Profits": "0.1",
                "Score": "0.539854645729065",
                "SHAPFigure": "https://i.ibb.co/RhYhns5/United-Tech-MV-explaination.png",
                "SHAPDescription": company_shap_description,
            },
        ],
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)

# A dummy back-end service

## Start JSON server
+ `npm install -g json-server`
+ `npm run start-server` 

Running the command will start the server at port 5050 by default with the database provided in `db.json`

## Make request:
Example:

+ Make a `GET` request to `http://localhost:5050/KGNet/getDogBreedInfo` with header:
```
{
	"img_url": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
}
```

+ Return data: 

```
[
  {
    "breed_class": "035.Boykin_spaniel",
    "min_height": "18.0",
    "max_height": "21.0",
    "min_weight": "41",
    "max_weight": "56",
    "level_of_obey": "0.6",
    "min_response_count": "26",
    "max_response_count": "42.5"
  },
  {
    "breed_class": "037.Brittany",
    "min_height": "17.0",
    "max_height": "21.0",
    "min_weight": "30",
    "max_weight": "40",
    "level_of_obey": "0.85",
    "min_response_count": "5",
    "max_response_count": "15.0"
  }
]
```
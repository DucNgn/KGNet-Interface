from fastapi import APIRouter
from starlette.responses import JSONResponse

companies_router = APIRouter(
    prefix="/KGNet", tags=["companies"], responses={"404": {"description": "Not found"}}
)


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


@companies_router.get("/getForbes2013SimilarCompanies")
def getForbes2013SimilarCompanies():
    return JSONResponse(
        {
            "Query": forbes2013Query,
            "QueryKeywords": "select,from,where,filter,group by,order by,sql:getCompanySimilarity",
            "SHAPFigure": "https://i.ibb.co/Ns1pV1M/Google-MV-explaination.png",
            "SHAPDescription": company_shap_description,
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
    )

const Age=(age)=>{
    if(age<=5){
        return "Infant";
    }
    else if(age<=12){
        return "Child";
    }
    else if(age<=25){
        return "Young";
    }
    else if(age<=40){
        return "Middle-Age";
    }
    else if(age<=60){
        return "Old";
    }
    else{
        return "Very Old";
    }
}
export default Age;
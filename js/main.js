/*
 * Function which wrap the functionality of birthday calculation.
 */
var brithdayCal = (function(){
    
    /*
     * Global variable declaration
     */
    var _textArea       = document.getElementById("json-input"),
        _yearTextBox    = document.getElementsByClassName("js-year"),
        _updateBtn      = document.getElementsByClassName("js-update"),
        _calendar       = document.getElementsByClassName("day__people"),
        _calendarBoxes  = document.getElementsByClassName("cal__day"),
        
    /*
     * Function to get day(in number) using date in string
     * @params: date{String} mm/dd/yyyy
     * @returns : Day{number}
     */    
    _getBirthDay = function(date){
        return new Date(date).getDay();
    },
    
    /*
     * Function to calculate birthday card size.
     * @params: numberOfBox{number}
     * @returns : boxSize{number} in percent(%) 
     */
    _getBoxWith = function(numberOfBox){
        return 100/(Math.ceil(Math.sqrt(numberOfBox)));       
    },
     /*
     * Function to get initials from full name
     * @params: name{String} 
     * @returns : name{String}
     */ 
    _getInitials = function(name){
       return name.split(' ').map(function(s){
          return s.charAt(0);
       }).join('').toUpperCase();
    },
    _getMaxDaysInMonth = function(month){
        
    }   
     /*
     * Function to validate date
     * @params: day{number}, month{number}, year{number}
     * @returns : valid{Boolen}
     */ 
    _isValidDate = function(day, month, year){
      
            // months are intended from 1 to 12
           var months31 = [1,3,5,7,8,10,12], // months with 31 days
               months30 = [4,6,9,11], // months with 30 days
               months28 = [2], // the only month with 28 days (29 if year isLeap)

               isLeap = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0),

               valid = (months31.indexOf(month)!==-1 && day <= 31) || (months30.indexOf(month)!==-1 && day <= 30) || (months28.indexOf(month)!==-1 && day <= 28) || (months28.indexOf(month)!==-1 && day <= 29 && isLeap);

           return valid; // it returns true or false

    },
    /*
     * Function to set birthday card size and append it in calendar 
     * @params: nodeArray{Object}
     * @returns : Void
     */ 
    _setBoxWidth = function(nodeArray){
        for(var day in nodeArray){
            if(nodeArray[day].length){
                 _calendarBoxes[day].className = 'cal__day';
            }else{
                _calendarBoxes[day].className = "cal__day day--empty"; 
            }
            _calendar[day].innerHTML = '';
            var size = _getBoxWith(nodeArray[day].length);
            nodeArray[day].forEach(function(node,index){
                
                node.style.width = size+'%';
                node.style.height = size+'%';
                _calendar[day].appendChild(node);
            });
        }

    },
    /*
     * Function to render birthday cards in calendar 
     * @params: Void
     * @returns : Void
     */ 
    _renderCards = function(){
        
        //Set vairiables 
        var data = _textArea.value,
        year     = _yearTextBox[0].value;
        data = eval(data);
        nodeArray = {'0':[],'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]};
        
        // Loop on Data array
        data.forEach(function(object,index){
            
            // Creating array to stor splited date string
            var birthdayArray = new Array();
            
            // Split date string
            birthdayArray = object.birthday.split('/');
            
            // If given year is after birthday year
            if(parseInt(birthdayArray[2])<=parseInt(year)){
                
                // If given date have twi slishes
                if(birthdayArray.length===3){
                    
                    // Change Bithday year into given year
                    birthdayArray[2] = year;
                    
                    // Recreateing date string
                    var birthdayString =  birthdayArray.join('/');
                    
                    //If date is valid
                    if(_isValidDate(parseInt(birthdayArray[1]),parseInt(birthdayArray[0]),parseInt(birthdayArray[2]))){
                        
                        //getting day in number
                        var day = _getBirthDay(birthdayString),
                        
                        // Creating div element
                         node = document.createElement("div"),          
                         
                        // Adding name initials in textnode
                         textnode = document.createTextNode(_getInitials(object.name));    
                         
                         //Adding text node into div
                        node.appendChild(textnode);  
                        
                        // Adding class to ndiv
                        node.className = "day__person";
                        
                        // if day is not sunday
                        if(day!==0){
                            
                            // Pushing div into array 
                            nodeArray[day-1].push(node);
                            
                        // If day is sunday
                        }else{
                            
                          // Pushing div into array  
                            nodeArray[6].push(node);
                        }

                    }
                }
            }
        });
        
        // Set Bithday card with and append it in calander
         _setBoxWidth(nodeArray);
    };
    
    var _init = function(){
        /*
         * Binding Event to update button for card rendering onclick
         */
        _updateBtn[0].addEventListener('click', function() {
            _renderCards();
        });
    };
    /*
     * Exposing function outside of this object.
     */
    return {init:_init};
});

/*
 * Getting Birthday object
 */
var obj = brithdayCal();

/*
 * Execution of init function of brithdayCal Object.
 */
obj.init();

 //Declaracion de variables globales.
	var screen = document.getElementById("screen");
	var scrollScreenX = null;
	var screen1 = document.getElementById("screen1");
	screen.innerHTML = "";
	screen1.innerHTML = "";
	screen11.innerHTML = "";
	var lastCursorPosition = 0;
	
	var statusMemory = false;
	var statusMemoryResult = false;
	var statusNumericalresultsInScreen = true;
	var errorMemory = true;
	
	var arrayScreenContainer = new Array();
	var arrayOperatorsAndFunctions = new Array();
	var arrayGuardingPlaceFromAParenthesis = new Array();
	
	var statusCharactersNumeric = true;
	var statusDeleteCharacter = true;
	statusWithResultInBox = true;
	var lastPositionCursor = null;
	
//+------------------------------------------------------------------+
//|     PRINCIPAL        **FUNCION:pressbutton**      PRINCIPAL      |
//+------------------------------------------------------------------+

	function pressbutton(element){
		
	  var name = element.getAttribute("name");
	  var isNumber = isNaN(name); //Verifica si el caracter es numerico.
	  		  
	    if(isNumber == false || name == '+' || name == '-'|| name == '*' || name == '/' || name == 'raiz' || name == 'raiz_1' || name == '1/' || name == 'pi' || name == 'sin' ||
		   name == 'cos' || name == 'tan' || name == 'asin' || name == 'acos' || name == 'atan' || name == '10^' || name == 'e^' || name == 'log' || name == 'ln' || name == 'n!' ||
		   name == '^2' || name == 'raizxy' || name == '.' || name == '%from' || name == 'Mod' || name == '^' || name == 'Deg' || name == 'F-E' || name == 'signo' || name == '(' || 
		   name == ')' || name == 'delete' || name == 'sum' || name == 'C' || name == 'CE' || name == 'memory' || name == 'memory_1')
	    {
	      verifyOperatorsAndFunctions(element,name,isNumber);
	    } 

	  scrollScreenX = screen.scrollLeft;
	  screen.scrollLeft = scrollScreenX + 5000;
    }

//+------------------------------------------------------------------+
//|                   **FUNCION:fastClick**                          |
//+------------------------------------------------------------------+

	window.addEventListener('load', function (){
		FastClick.attach(document.body);
	}, false);
	
//+------------------------------------------------------------------+
//|                  **FUNCION:startButtonTouch**                    |
//+------------------------------------------------------------------+

    function startButtonTouch(){

      var identity = 'null';
	  var statusMouse = true;
	  var statusTouchMove = true;
	  var t = 0;
	  var variousTouches = false;
	  var lastId = null;
	  //var box = document.getElementById("screen").focus();
	  
	  //Instruccion para el Touch.
      document.addEventListener('touchstart', function(e) //Se activa con el touch.
	  {
		if (e.touches.length == 1)	
		{
		  identity = captureId(event);
		
		  if(identity.name != null){
	        pressbutton(identity.id);			
	      }
		}
	  else{
			variousTouches = true;
		}

	  }, false);
         
	  document.addEventListener('touchmove', function() //Se activa cuando se desliza en el touch.
	  {
		if (variousTouches == false)	
		{
		  statusTouchMove = false;
		  errorMemory = true;
		}

      }, false)
	  
	  document.addEventListener('touchend', function() //Se activa cuando se deja el touch.
	  {
		if (variousTouches == false)	
		{
		   if(identity.name == 'memory' && errorMemory == false || identity.name == 'memory' &&  statusTouchMove == false ||
		       identity.name == 'memory_1' && errorMemory == false || identity.name == 'memory_1' &&  statusTouchMove == false)
		   {
			 
			  if(identity.name == 'memory' && errorMemory == true && screen11.innerHTML != ''){
			     identity.id.style.backgroundColor = "LimeGreen"; //Cambia el color de fondo del boton "M" a 'verde'.DarkTurquoise			
		      }
		    else if (identity.name == 'memory_1' && errorMemory == true && screen11.innerHTML != ''){
			     identity.id.style.backgroundColor = "DarkTurquoise"; //Cambia el color de fondo del boton "M" a 'Turquesa'.DarkTurquoise  
		      }
		    else if(errorMemory == true && screen11.innerHTML == ''){ 
		        identity.id.style.backgroundImage = "url('css/imgBoton/boton.png')";
		      }
			    errorMemory = true;
		   }
		 else if(identity.name == 'memory' && errorMemory == true && screen11.innerHTML != ''){
			 identity.id.style.backgroundColor = "LimeGreen"; //Cambia el color de fondo del boton "M" a 'verde'.DarkTurquoise			
		   }
		 else if (identity.name == 'memory_1' && errorMemory == true && screen11.innerHTML != ''){
			 identity.id.style.backgroundColor = "DarkTurquoise"; //Cambia el color de fondo del boton "M" a 'Turquesa'.DarkTurquoise  
		   }
	     else if(identity.name != null){
			  if(lastId != null){
		        lastId.style.backgroundImage = "url('css/imgBoton/boton.png')";
		      }
			  setTimeout(function(){ 
			  identity.id.style.backgroundImage = "url('css/imgBoton/boton.png')";},100);
			  lastId = identity.id;
		   }
		}
		    if(statusTouchMove == true){
	          statusMouse = false;
		    }
		  else{
			   statusTouchMove = true;
		    }

			variousTouches = false;
		
      }, false)
	  
	  //Instruccion para el Mouse.
	  document.addEventListener('mousedown', function()//Se activa haciendo click con el mouse sin soltar.
	  {
		  if(statusMouse == true){
		    identity = captureId(event);
		
		    if(identity.name != null){
	          pressbutton(identity.id);	
	        }
	      }	

      }, false) 

      document.addEventListener('mouseup', function()//Se activa cuando se deja el mouse.
	  {
	      if(statusMouse == true){
			
		      if(identity.name == 'memory' && errorMemory == false || identity.name == 'memory_1' && errorMemory == false){ 
			    errorMemory = true;	
		      }
		    else if(identity.name == 'memory' && errorMemory == true && screen11.innerHTML != ''){
			    identity.id.style.backgroundColor = "LimeGreen"; //Cambia el color de fondo del boton "M" a 'verde'.DarkTurquoise			
		      }
		    else if (identity.name == 'memory_1' && errorMemory == true && screen11.innerHTML != ''){
			    identity.id.style.backgroundColor = "DarkTurquoise"; //Cambia el color de fondo del boton "M" a 'Turquesa'. 
		      }
	        else if(identity.name != null){
			    identity.id.style.backgroundImage = "url('css/imgBoton/boton.png')";
				
				/*if(identity.name != 'left' && identity.name != 'right' && identity.name != 'C' && identity.name != 'sum' && arrayScreenContainer.length > 0){
			       moveCaret(screen,arrayScreenContainer.length);
			    }*/
		      }
		  }
	    else{
		      statusMouse = true;
	      }

      }, false)

		/*window.addEventListener('native.hidekeyboard', keyboardHideHandler);
		window.addEventListener('native.showkeyboard', keyboardShowHandler);*/	  
	}
	
	/*function keyboardHideHandler(e){
    alert('Goodnight, sweet prince');
    }
	
    function keyboardShowHandler(e){
    alert('Keyboard height is: ' + e.keyboardHeight);
    }*/

//+------------------------------------------------------------------+
//|                    **FUNCION:captureId**                         |
//+------------------------------------------------------------------+	
	
	function captureId(event){
		
		var id = event.target;
		var name = id.getAttribute("name");
		
		if(name == "screen"){
		  name = null;	
		}
		
		var returningVariables = {id: id,name: name};
		return returningVariables;
	}
	   	
//+------------------------------------------------------------------+
//|                **FUNCION:converterCharacter**                    |
//+------------------------------------------------------------------+
	
	function converterCharacter(name){ //Convierte al caracter correcto, para visualizarlo en la caja de texto "screen".

		if(name == "raiz" || name == "raiz_1")
		{
		 name = "√";
        }
		
	  else if(name == "pi")
		{
		 name = "π";
        }
		
	  else if(name == "raizxy")
		{
		 name = "√";
        }
		
	  else if(name == "(")
		{ 
		 name = '('.fontcolor('#FF4500'); //Cambia el color del caracter.
        }

		return name;
	}
	
//+------------------------------------------------------------------+
//|             **FUNCION:getCursorPositionInScreen**                |
//+------------------------------------------------------------------+

	function getCursorPositionInScreen(element){
		
	    if(screen.innerHTML.length > 1){
		 document.getElementById('left').style.visibility = 'visible'; //Muestra los botones de edicion de texto.
		 document.getElementById('right').style.visibility = 'visible'; //Muestra los botones de edicion de texto.
	    }
	}
//+------------------------------------------------------------------+
//|                     **FUNCION:editingText**                      |
//+------------------------------------------------------------------+
	
	function editingText(element){
	
	    var name = element.getAttribute("name");
	    var cursorPositionActual = document.getSelection().getRangeAt(0).startOffset;
	  

	    if(name == 'left' && cursorPositionActual > 0)
	    {
		  cursorPositionActual--;
	      moveCaret(screen,cursorPositionActual);
        		
	    }
	  else if(name == 'right' && cursorPositionActual < arrayScreenContainer.length)
	    {
		  cursorPositionActual++;
	      moveCaret(screen,cursorPositionActual);
	    }     
	}
	
//+------------------------------------------------------------------+
//|                     **FUNCION:moveCaret**                        |
//+------------------------------------------------------------------+
	
	function moveCaret(el,position){
		
		var range = document.createRange();
		var sel = window.getSelection();
		range.setStart(el.childNodes[0], position);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
    }
	
//+------------------------------------------------------------------+
//|                **FUNCION:verifyParenthesis**                     |
//+------------------------------------------------------------------+
	
    function verifyParenthesis(name,statusCloseParenthesis,deleteParenthesis,statusParenthesis,element){

		var arrayOpenParenthesis = new Array();
	    var arrayCloseParenthesis = new Array();
        var n = 0;
		var m = 0;
		var i, k, len, len_1;
		
	if(statusCloseParenthesis == true){
		
		arrayOperatorsAndFunctions.push(name); //Adiciona un nuevo elemento al array.
		arrayScreenContainer.push(name);
		
		for(i=0, len = arrayOperatorsAndFunctions.length; i<len; i++)
		{  
		   if(arrayOperatorsAndFunctions[i] == "(")
		   {
		     arrayOpenParenthesis.push(arrayOperatorsAndFunctions[i]);
			 n++;
		   }
		 else if(arrayOperatorsAndFunctions[i] == ")")
		   {
		     arrayCloseParenthesis.push(arrayOperatorsAndFunctions[i]);
			 m++;
		   }
		}

	    if(n == m || n > m){
         
		 var p = false;
		  
		 for(i=0, len = arrayOpenParenthesis.length; i<len; i++)
		 { 
		   if(arrayOpenParenthesis[len - (i + 1)] == "(" && arrayCloseParenthesis[i] == ")")
		   {
			 var h = 0;
			 
		     for(k=0, len_1 = arrayOperatorsAndFunctions.length;  k<len_1; k++)
		     {
			    if(arrayOperatorsAndFunctions[k] == '(')
		        {
				  h++;
				  if(h == n - i)
				  { 
				    if(arrayScreenContainer[k] == '('.fontcolor('#FF4500'))
					{
					  arrayScreenContainer[k] = "(";
					  arrayGuardingPlaceFromAParenthesis.push(h); //Guarda la posicion de los parentesis en el array.
					  arrayGuardingPlaceFromAParenthesis.push(m);
					  p = true;
					  break;
					}
				  }
		        }
			 }
		   }

		   if(p == true){
		     break;
		   }
		 }

		  screen.innerHTML = '';
		  
          for(i=0, len = arrayScreenContainer.length; i<len; i++)
		  {
	        screen.innerHTML += arrayScreenContainer[i];
		  }
		   errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
	    }
      else
        {
	      arrayOperatorsAndFunctions.splice(arrayOperatorsAndFunctions.length - 1,1); //Borra el ultimo caracter del array.
		  arrayScreenContainer.splice(arrayScreenContainer.length - 1,1); //Borra el ultimo caracter del array.
		  errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
	    }
	}
	
  else if(deleteParenthesis == true)
    {		
		 for(i=0, len = arrayOperatorsAndFunctions.length; i<len; i++)
		 {  
		   if(arrayOperatorsAndFunctions[i] == "(")
		   {
		     arrayOpenParenthesis.push(arrayOperatorsAndFunctions[i]);
			 n++;
		   }
		 else if(arrayOperatorsAndFunctions[i] == ")")
		   {
		     arrayCloseParenthesis.push(arrayOperatorsAndFunctions[i]);
			 m++;
		   }
		 }
		 
	  if(n > m){
		  
		var h = 0;
		len_1 = arrayGuardingPlaceFromAParenthesis.length - 2;
			 
		for(k=0, len = arrayOperatorsAndFunctions.length; k<len; k++)
		{
		  if(arrayOperatorsAndFunctions[k] == "(")
		  {
			h++;
		    if(h == arrayGuardingPlaceFromAParenthesis[len_1])
		    { 
			  arrayScreenContainer[k] = "(".fontcolor('#FF4500');
			  arrayGuardingPlaceFromAParenthesis.splice(len_1,2);; //Borra a partir del penultimo elemento del array.
			  break;
		    }
		  }
	    }
	  }			  
    }      
	
  else if(statusParenthesis == true)
    {
         for(i=0, len = arrayOperatorsAndFunctions.length; i<len; i++)
		 {  
		   if(arrayOperatorsAndFunctions[i] == "(")
		   {
		     n++;
		   }
		 else if(arrayOperatorsAndFunctions[i] == ")")
		   {
		     m++;
		   }
		 }
		 
		 if(n == m)
		 {
		   return true;
		 }
		 
		   return false;
    }	
}
	
//+------------------------------------------------------------------+
//|                    **FUNCION:errorDetector**                     |
//+------------------------------------------------------------------+ 
	
	function errorDetector(element,enable){
		
	  if(element != null){
		  
	      if(enable == true){
			  element.style.backgroundImage = 'none';
			  element.style.backgroundColor = '#00c7ff';	  
	      }
	    else if(enable == false){	 
            element.style.backgroundImage = 'none';
			element.style.backgroundColor = 'red';
	      }
	  }
    } 
   	
//+------------------------------------------------------------------+
//|            **FUNCION:verifyOperatorsAndFunctions**               |
//+------------------------------------------------------------------+

    function verifyOperatorsAndFunctions(element,name,characterNumeric){
		
	 var i, k, z, len, len_1, len_2;
	 var expressionToCalculate = "";
	 
	    if(characterNumeric == false)
        {
		   if(statusWithResultInBox == false){
			 resetCalculator(name,element,false);  
		   }   
		      if(statusCharactersNumeric == true){
				  
			    var verifyingLastCharacter = arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1]; //Verifica si el ultimo caracter del array es un parentesis de cierre.

		         if(verifyingLastCharacter != ')' && verifyingLastCharacter != 'pi')
	             { 
			       repetitiveExecutionProcedureOperatorsPreceding(name);
			       errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		         }
               else{  
			     errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
                 }
			  }
			else{  
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
              }			 
		}
		
      else if(name == "+" || name == "-" || name == "*" || name == "/")
		{
		  var nameOfOperators = ['pi',')']; //Nombre de los operadores de los botones.
		  var operatorNameDetected = false;
		  
		      len_1 = arrayOperatorsAndFunctions.length - 1;
		      for(i=0, len = nameOfOperators.length; i<len; i++)
		      { 
                if(arrayOperatorsAndFunctions[len_1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		        {
		          operatorNameDetected = true;
			      break;
		        }
		      }
			
		  if(name == "+" || name == "-" || name == "*"){
			  
			var calculatingWithTheResult = false;
		    calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			
			if(calculatingWithTheResult == false){
			  
			  var isNumber = isNaN(arrayOperatorsAndFunctions[len_1]); //Verifica si el ultimo caracter del array es un numero ó no.

		       if(isNumber == false || operatorNameDetected == true)
	           {
			     repetitiveExecutionProcedureOperatorsPreceding(name);
				 statusCharactersNumeric = true;
				 statusDeleteCharacter = true;
                 errorDetector(element,true);				 
			   }
			   else{
				 errorDetector(element,false);
			   }
			}
		  }
		else if(name == "/"){
			  
			  var partialDetectionGlobal = PartialVerificationOfOperatorsAndFunctions(arrayOperatorsAndFunctions,name);
			  var calculatingWithTheResult = false;
			  
			  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			  
			  if(calculatingWithTheResult == false){
				  
		          if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true || 
			         partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false || operatorNameDetected == true)
	              { 
			        repetitiveExecutionProcedureOperatorsPreceding(name);
				    statusCharactersNumeric = true;
					statusDeleteCharacter = true;
				    errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		          }
			    else{
				  errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			      }
	         }
		  
		  } 
		}
		
	  else if(name == "^2" || name == "raizxy" || name == "%from" || name == "Mod" || name == "^" || name == "." || name == "/" || name == "log")
		{
		   var partialDetectionGlobal = PartialVerificationOfOperatorsAndFunctions(arrayOperatorsAndFunctions,name);
		
		   if(name == "^2"){
			   
			 var potentiationOperatorsSquared = ['^','2'];
			 var calculatingWithTheResult = false;
			 calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.

		     if(calculatingWithTheResult == false){

		           if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true ||
     			      partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false) //Verifica la posicion del cursor en el texto.
			       {
			             var position = document.getSelection().getRangeAt(0).startOffset;
						 
				         for(i=0, len = potentiationOperatorsSquared.length; i<len; i++)
		                 {
			               arrayScreenContainer.splice(position,0,potentiationOperatorsSquared[i]); //El array almacena el operador y el numero exponente de la potencia, en este caso, el exponente numero "2".
			               arrayOperatorsAndFunctions.splice(position,0,potentiationOperatorsSquared[i]);
						   position++;
			             }
						 
				         screen.innerHTML = ""; //Se limpia la caja de texto.
				         for(i=0, len = arrayScreenContainer.length; i<len; i++)//Nuevamente la caja de texto recibe los elementos del array.
		                 {  
		                   expressionToCalculate += arrayScreenContainer[i];
		                 }
				          screen.innerHTML = expressionToCalculate;
						  statusCharactersNumeric = false;
						  lastPositionCursor = position;
			              errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
				   }
				 else
			       {
				      errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis. 
			       }
			 }
		   }		  
	     else if(name == "raizxy")
		   {
			  var calculatingWithTheResult = false;
			  
			  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			  
			  if(calculatingWithTheResult == false){
				  
		         if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true || 
			        partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false)
	             { 
				
				   arrayScreenContainer = verifyArrayResultOfOperatorsAndNumbers(arrayScreenContainer); //Elimina los numeros que estan antes de la funcion en el array.
				
				   for(i=0, len = partialDetectionGlobal.numberRoot.length; i<len; i++)
		           {  
		              arrayScreenContainer.push(partialDetectionGlobal.numberRoot.charAt(i).fontsize(2).sup());
		           }
				
	               arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
	               arrayScreenContainer.push('('.fontcolor('#FF4500'));
				   arrayOperatorsAndFunctions.push(name);
				   arrayOperatorsAndFunctions.push('(');
				
				   screen.innerHTML = "";
				   for(i=0, len = arrayScreenContainer.length; i<len; i++)
		           {  
		             expressionToCalculate += arrayScreenContainer[i];
		           }
				
				   screen.innerHTML += expressionToCalculate;
                   errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.			 
		         }
			   else{
				    errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis. 
			     }
			  }
	       }
		 else if(name == "%from" || name == "Mod" || name == "^")
		   {
			  var calculatingWithTheResult = false;
			  
			  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			  
			  if(calculatingWithTheResult == false){
				  
		          if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true || 
			         partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false)
	              { 
			        repetitiveExecutionProcedureOperatorsPreceding(name);
				    statusCharactersNumeric = true;
				    errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		          }
			    else{
				  errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			      }
	         }
		   }
		 else if(name == ".")
		   {	  
			 if(statusCharactersNumeric == true){	  
				  
		            if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true || 
			           partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false)
	                { 
			          repetitiveExecutionProcedureOperatorsPreceding(name);
				      errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		            }
			      else{
				     errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			        }
			 }
		   else{
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			 }
		   } 
		 else if(name == "log")
		   {
			  var calculatingWithTheResult = false;
			  
			  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			  
			  if(calculatingWithTheResult == false){
				  
		          if(partialDetectionGlobal.isNumber == false && partialDetectionGlobal.operatorNameDetected == true || 
			         partialDetectionGlobal.isNumber == false && partialDetectionGlobal.otherOperatorNameDetected == false)
	              {
			         arrayScreenContainer = verifyArrayResultOfOperatorsAndNumbers(arrayScreenContainer); //Elimina los numeros que estan antes de la funcion en el array.
			         arrayOperatorsAndFunctions.push(name); //Alamacena la funcion en el array.
				     arrayOperatorsAndFunctions.push('('); //Alamacena la funcion en el array.
			         arrayScreenContainer.push("log");
				 
				     for(i=0, len = partialDetectionGlobal.numberRoot.length; i<len; i++)
		             {  
		               arrayScreenContainer.push(partialDetectionGlobal.numberRoot.charAt(i).fontsize(2).sub());
		             }
				 
                     arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen". 			 
				 
				     screen.innerHTML = "";
				     for(i=0, len = arrayScreenContainer.length; i<len; i++)
		             {  
		               expressionToCalculate += arrayScreenContainer[i];
		             }
				      screen.innerHTML = expressionToCalculate;
				      errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		          }
			    else{
				    errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			      }  
		      } 
		   }
        }		 
			
	  else if(name == "raiz" || name == "raiz_1")
	    {
		  var nameOfOperators = ['+','-','*','/','(','raiz']; //Nombre de los operadores de los botones.
		  var operatorNameDetected = false;
		  var calculatingWithTheResult = false;
		  
		  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
		  
		  if(calculatingWithTheResult == false){
		  
			  if(arrayOperatorsAndFunctions.length > 0){
		  
		      for(i=0, len = nameOfOperators.length; i<len; i++)
		      { 
                if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		        {
		          operatorNameDetected = true;
			      break;
		        }
		      }
		    }
		  else
		    {
		      operatorNameDetected = "null"
		    }
		  
		     if(operatorNameDetected == true && name == "raiz_1" || operatorNameDetected == "null" && name == "raiz_1")
	         { 
			    arrayOperatorsAndFunctions.push(name); //Alamacena la funcion en el array.
                arrayOperatorsAndFunctions.push('('); //Alamacena la funcion en el array.
			    arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen". 				 
                arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen". 				 		 
				
				screen.innerHTML = "";
				for(i=0, len = arrayScreenContainer.length; i<len; i++)
		        {  
		          expressionToCalculate += arrayScreenContainer[i];
		        }
				 screen.innerHTML = expressionToCalculate;
				 errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
			 }
		   else if(name == "raiz_1")
		     {
				errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			 }
		   else if(operatorNameDetected == true && name == "raiz" || operatorNameDetected == "null" && name == "raiz")
		     {
				repetitiveExecutionProcedureOperatorsPreceding(name);
				errorDetector(element,true);
			 }
           else{
	           errorDetector(element,false);
             }			 
		  }
		}
		  
	  else if(name == "1/")
		{ 
		  var nameOfOperators = ['+','-','*','/','(']; //Nombre de los operadores de los botones.
		  var reverseOperators = ['1','/'];
		  var operatorNameDetected = false;
		  var calculatingWithTheResult = false;
		  var expressionToCalculate = '';
		  
		  calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
		  
		  if(calculatingWithTheResult == false){
		  
		    if(arrayOperatorsAndFunctions.length > 0){
		  
		      for(i=0, len = nameOfOperators.length; i<len; i++)
		      { 
                if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		        {
		          operatorNameDetected = true;
			      break;
		        }
		      }
		    }
		  else
		    {
		      operatorNameDetected = "null"; 
	        }
		  
		     if(operatorNameDetected == true || operatorNameDetected == "null")
	         { 
			   for(i=0, len = reverseOperators.length; i<len; i++)
		       {
			      arrayScreenContainer.push(reverseOperators[i]); //El array almacena el operador y el numero exponente de la potencia, en este caso, el exponente numero "2".
			      arrayOperatorsAndFunctions.push(reverseOperators[i]);
			   }
			   
			   screen.innerHTML = "";
			   for(i=0, len = arrayScreenContainer.length; i<len; i++)
		       {  
		         expressionToCalculate += arrayScreenContainer[i];
		       }
				
			   screen.innerHTML += expressionToCalculate;
               errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.			   
		     }
			 else{
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			 }
		  }
		}
		  
	  else if(name == "pi")
		{
		    var nameOfOperators = ['+','-','*','/','(']; //Nombre de los operadores de los botones.
		    var operatorNameDetected = false;
		  
		    if(arrayOperatorsAndFunctions.length > 0){
		  
		      for(i=0, len = nameOfOperators.length; i<len; i++)
		      { 
                if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		        {
		          operatorNameDetected = true;
			      break;
		        }
		      }
		    }
		  else
		    {
		      operatorNameDetected = "null"; 
	        }
		  
		     if(operatorNameDetected == true || operatorNameDetected == "null")
	         { 
			   repetitiveExecutionProcedureOperatorsPreceding(name);
               errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.			   
		     }
		   else{
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis. 
			 }
	    }
		  
	  else if(name == "sin" || name == "cos" || name == "tan" || name == "asin" || name == "acos" || name == "atan" || name == "ln" || name == "n!")
		{
		    var nameOfOperators = ['+','-','*','/','(']; //Nombre de los operadores de los botones.
		    var operatorNameDetected = false;
			var calculatingWithTheResult = false;
		  
		    calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.

		    if(calculatingWithTheResult == false){
			
		      if(arrayOperatorsAndFunctions.length > 0){
		  
		        for(i=0, len = nameOfOperators.length; i<len; i++)
		        { 
                  if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		          {
		            operatorNameDetected = true;
			        break;
		          }
		        }
		      }
		    else
		      {
		        operatorNameDetected = "null";
	          }
		  
		       if(operatorNameDetected == true || operatorNameDetected == "null")
	           { 
			     arrayOperatorsAndFunctions.push(name); //Alamacena la funcion en el array.
                 arrayOperatorsAndFunctions.push('('); //Alamacena la funcion en el array.
			     arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen". 				 
                 arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen". 				 		 
		        
				screen.innerHTML = "";
				for(i=0, len = arrayScreenContainer.length; i<len; i++)
		        {  
		          expressionToCalculate += arrayScreenContainer[i];
		        }
				 screen.innerHTML = expressionToCalculate;
				 errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		       }
			 else{
				 errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.  
			   }
			}
		}
		  
	  else if(name == "10^")
	    {
		    var nameOfOperators = ['+','-','*','/','(']; //Nombre de los operadores de los botones.
			var potentiationBaseTen = ['10','^'];
		    var operatorNameDetected = false;
			var calculatingWithTheResult = false;
		  
		    calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.

		    if(calculatingWithTheResult == false){
		   
		      if(arrayOperatorsAndFunctions.length > 0){
		  
		        for(i=0, len = nameOfOperators.length; i<len; i++)
		        { 
                  if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		          {
		            operatorNameDetected = true;
			        break;
		          }
		        }
		      }
		    else
		      {
		        operatorNameDetected = "null";
	          }
			    
			   if(operatorNameDetected == true || operatorNameDetected == "null")
	           {
				  screen.innerHTML += name; //La caja de texto "screen" recibe los caracteres numericos ó operadores.
				
			      for(i=0, len = potentiationBaseTen.length; i<len; i++)
		          {
			        arrayScreenContainer.push(potentiationBaseTen[i]); //El array almacena el operador y el numero exponente de la potencia, en este caso, el numero "2".
			        arrayOperatorsAndFunctions.push(potentiationBaseTen[i]);
			      }
				   errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
			   }
			   else{
				   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			   }
		    }
		}
		  
	  else if(name == "e^")
		{
		    var nameOfOperators = ['+','-','*','/','(']; //Nombre de los operadores de los botones.
		    var operatorNameDetected = false;
			var potentiationBaseEuler = ['e','^'];
			var calculatingWithTheResult = false;
		  
		    calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.

		    if(calculatingWithTheResult == false){
		   
		      if(arrayOperatorsAndFunctions.length > 0){
		  
		        for(i=0, len = nameOfOperators.length; i<len; i++)
		        { 
                  if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		          {
		            operatorNameDetected = true;
			        break;
		          }
		        }
		      }
		    else
		      {
		        operatorNameDetected = "null";
	          }
			    
			   if(operatorNameDetected == true || operatorNameDetected == "null")
	           {
				  screen.innerHTML += name; //La caja de texto "screen" recibe los caracteres numericos ó operadores.
				
			      for(i=0, len = potentiationBaseEuler.length; i<len; i++)
		          {
			        arrayScreenContainer.push(potentiationBaseEuler[i]); //El array almacena el operador y el numero exponente de la potencia, en este caso, el numero "2".
			        arrayOperatorsAndFunctions.push(potentiationBaseEuler[i]);
			      }
				   errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
			   }
			 else{
				   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
			 }
		    }
		}
		  
	  else if(name == "Deg")
		{
		
		}
		  
      else if(name == "F-E")
		{
		  
		}
		  
      else if(name == "signo")
        {
			var calculatingWithTheResult = false;
		  
		    calculatingWithTheResult = continueCalculatingWithTheResult(name,element); //Continua calculando con el resultado.
			
          if(arrayOperatorsAndFunctions.length > 0){
		    if(calculatingWithTheResult == false){
					    
                if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == ')' || arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == '/' && arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 2] == ')' ||
				   arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == '*' && arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 2] == ')') ////Verifica si el ultimo caracter del array es un operador.
		        {
		             for(k=3, len_1 = arrayOperatorsAndFunctions.length; k<=len_1; k++)
		             {
						if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - k]  == "(")
						{
					        var characterToRemove = null;
					
							for(z=k+1, len_2 = arrayOperatorsAndFunctions.length; z<=len_2; z++)
		                    {
						      if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]  == "+" || arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]  == "-")
						      {
								characterToRemove = arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]; //Obtiene el caracter a remover.
								
								if(arrayOperatorsAndFunctions.length - z > 0){
								    if(characterToRemove == "+"){
										
			                          arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] = "-";
			                          arrayScreenContainer[arrayScreenContainer.length - z] = "-";
									}
                                  else if(characterToRemove == "-"){
									  arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] = "+";
			                          arrayScreenContainer[arrayScreenContainer.length - z] = "+";
								    }									
									
								}
							  else if(arrayOperatorsAndFunctions.length - z == 0){
								    
									if(characterToRemove == "-"){
									  arrayOperatorsAndFunctions.splice(0,1); //Borra el ultimo caracter del array.
			                          arrayScreenContainer.splice(0,1); //Borra el ultimo caracter del array.
								    }
                                  else{
									  arrayOperatorsAndFunctions.unshift("-");
			                          arrayScreenContainer.unshift("-");
								    }									
								}
							    break;
						      }
							else if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]  == ")"){
								   characterToRemove = false;
								   break;
							  }
					        }
							if(characterToRemove == null){
							   arrayOperatorsAndFunctions.unshift("-");
			                   arrayScreenContainer.unshift("-");  	
							}
							
							if(characterToRemove == null || characterToRemove != false){
							   break; 	
							}
						}
					 }				 
		        }
			  else
			    {
				            var characterToRemove = null;
							var statusSign = false;
							var statusSign_1 = false;

					        for(z=1, len = arrayOperatorsAndFunctions.length; z<=len; z++)
		                    { 
						      var isNumber = isNaN(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]); //Verifica si el ultimo caracter del array es un numero ó no.

						      if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]  == "+" || arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]  == "-")
						      {
								characterToRemove = arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z]; //Obtiene el caracter a remover.
								
								if(arrayOperatorsAndFunctions.length - z > 0){
								    if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - (z+1)] == "(" && arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "-" ||
									   arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - (z+1)] == "/" && arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "-" ||
									   arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - (z+1)] == "*" && arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "-"){
									  var s = arrayOperatorsAndFunctions.length - z;
			                          arrayOperatorsAndFunctions.splice(s,1); //Borra caracter del array.
			                          arrayScreenContainer.splice(s,1); //Borra caracter del array.
									}
								  else if(characterToRemove == "+"){
										
			                          arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] = "-";
			                          arrayScreenContainer[arrayScreenContainer.length - z] = "-";
									}
                                  else if(characterToRemove == "-"){
									  arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] = "+";
			                          arrayScreenContainer[arrayScreenContainer.length - z] = "+";
								    }									
									
								}
							  else if(arrayOperatorsAndFunctions.length - z == 0){
								    
									if(characterToRemove == "-"){
									  arrayOperatorsAndFunctions.splice(0,1); //Borra el ultimo caracter del array.
			                          arrayScreenContainer.splice(0,1); //Borra el ultimo caracter del array.
								    }
                                  else{
									  arrayOperatorsAndFunctions.unshift("-");
			                          arrayScreenContainer.unshift("-");
								    }									
								}
								statusSign_1 = true;
							    break;
						      }
							else if(isNumber == false && z == 1 && arrayOperatorsAndFunctions.length > 1 || arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "." && z > 1 && arrayOperatorsAndFunctions.length > 1 ||
							        arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "/" && z > 1 && arrayOperatorsAndFunctions.length > 1 ||
									arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - z] == "*" && z > 1 && arrayOperatorsAndFunctions.length > 1)
							  {
								   statusSign = true;
							  }
							else if(isNumber == true && z > 1 && statusSign == true){
								   var s;
								   for(k=1, len_2 = arrayOperatorsAndFunctions.length; k<=len_2; k++)
		                           {
									 var isNumber = isNaN(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - k]); //Verifica si el ultimo caracter del array es un numero ó no.
									 var character = arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - k];
									 
									 if(isNumber == true && character != "." && character != "/" && character != "%from" && character != "raiz" && character != "raiz_1"){
									   s = arrayOperatorsAndFunctions.length - k+1;
								       arrayOperatorsAndFunctions.splice(s,0,"-");
			                           arrayScreenContainer.splice(s,0,"-");
								       statusSign_1 = true;
									   break;
								     }
								   else if(character == "%from" || character == "raiz" || character == "raiz_1"){
		                                
                                      for(i=k+1, len = arrayOperatorsAndFunctions.length; i<=len; i++){
		                          
										     if(arrayOperatorsAndFunctions[len - i] == "+" && len - i != 0){
			                                   arrayOperatorsAndFunctions[len - i] = "-";
			                                   arrayScreenContainer[len - i] = "-";
											   break;
									         }
                                           else if(arrayOperatorsAndFunctions[len - i] == "-" && len - i != 0){
									           arrayOperatorsAndFunctions[len - i] = "+";
			                                   arrayScreenContainer[len - i] = "+";
											   break;
								             }
										   else if(len-i == 0){
											   break; 
										     }
									  }
									    if(i > len || len-i == 0){
										  
									       if(arrayOperatorsAndFunctions[len-i] == "-"){
									         arrayOperatorsAndFunctions.splice(0,1); //Borra el ultimo caracter del array.
			                                 arrayScreenContainer.splice(0,1); //Borra el ultimo caracter del array.
								           }
                                         else{
									         arrayOperatorsAndFunctions.unshift("-");
			                                 arrayScreenContainer.unshift("-");
								           }
									    }
			  
                                        statusSign_1 = true;										   
									    break;
									 }
							       }
								   break;
							  }
					        }
						  if(characterToRemove == null && statusSign == false || characterToRemove == null && statusSign_1 == false){
							 arrayOperatorsAndFunctions.unshift("-");
			                 arrayScreenContainer.unshift("-");	
					      }	  
				}
		   
		        screen.innerHTML = ""; //Limpia la caja de texto.
                for(i=0, len = arrayScreenContainer.length; i<len; i++)
		        {
	              expressionToCalculate += arrayScreenContainer[i];
		        }
				 screen.innerHTML = expressionToCalculate;
				 errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		    }
		  }
	    else{ 
			errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
		  }
		}
		  
      else if(name == '(')
	    {
		    var nameOfOperators = ['(','+','-','*','/','sin','cos','tan','asin','acos','atan','raiz','raiz_1','raizxy','log','ln','n!']; //Nombre de operadores y funciones.
		    var operatorNameDetected = false;
		   
		    if(arrayOperatorsAndFunctions.length > 0){
			
			  for(i=0, len = nameOfOperators.length; i<len; i++)
		      { 
                if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		        {
		          operatorNameDetected = true;
			      break;
		        }
		      }
			}
		  else
			{
			  operatorNameDetected = "null"
			}
		  
		     if(operatorNameDetected == true || operatorNameDetected == "null")
	         { 
			   repetitiveExecutionProcedureOperatorsPreceding(name);
               errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.			   
		     }
		   else{
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
		     }
	    }	
		  
      else if(name == ')')
		{
		    var nameOfOperators = ['pi',')']; //Nombre de los operadores de los botones.
		    var operatorNameDetected = false;
			var isNumber = isNaN(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1]); //Verifica si el ultimo caracter del array es un numero ó no.
		   
		    for(i=0, len = nameOfOperators.length; i<len; i++)
		    { 
              if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == nameOfOperators[i]) ////Verifica si el ultimo caracter del array es un operador.
		      {
		        operatorNameDetected = true;
			    break;
		      }
		    }
		  
		     if(isNumber == false || operatorNameDetected == true)
	         { 
			   verifyParenthesis(name,true,false,false,element);			   
		     }
		   else{
			   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
		     }
		}
		  
      else if(name == 'delete')
		{
		    deleteCharacter(name,element);
		}
		  
	  else if(name == 'sum')
		{
		    sum(name,element);
		}
		  
      else if(name == 'C')
		{
		    resetCalculator(name,element,true);
	    }
      else if(name == 'CE')
		{
		    clearScreen(element);
		}
	  else if(name == 'memory' || name == 'memory_1')
		{
		    memoryResult(name,element);
		}
 }

//+------------------------------------------------------------------+
//|      **FUNCION:PartialVerificationOfOperatorsAndFunctions**      |
//+------------------------------------------------------------------+  
	/*function PartialVerificationOfOperatorsAndFunctions(array,name){

          var nameOfOperators = ['+','-','*','/','(','raizxy','.','%from','raiz','raiz_1',')']; //Nombre de operadores de botones.								   
		  var operatorNameDetected = false;
		  var otherOperatorNameDetected = false;
		  var position = document.getSelection().getRangeAt(0).startOffset;
		  var isNumber = isNaN(array[position - 1]); //Verifica si el ultimo caracter del array es un numero ó no.
		  var numberRoot = "";
		  var isNumberDecimal = true;
		  var i, k, n, j, len, len_1;

		  if(isNumber == false)
		  {
	        for(i=0, len = position; i<len; i++)
		    {
		      var operatorBeforeTheNumber = isNaN(array[position - (i+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
    
		      if(operatorBeforeTheNumber == true){

			    otherOperatorNameDetected = true;

		        for(k=0, len_1 = nameOfOperators.length; k<len_1; k++)
		        {
		          if(array[position - (i+1)] == nameOfOperators[k]) 
		          {
					operatorNameDetected = true;
					
					if(array[position - (i+1)] == '.'){
					  numberRoot += array[position - (i+1)]; //Empieza a obtener el numero decimal.
					  operatorNameDetected = name != '.';
					  for(n=i+1; n<position; n++)
		              {
						  isNumberDecimal = isNaN(array[position - (n+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
						  if(isNumberDecimal == false){
						    numberRoot += array[position - (n+1)];
						  }
					    else{
							operatorNameDetected = array[position - (n+1)] != '.';
							operatorNameDetected = name != '.';
						    break;
					      }
					  }
				    } 
                  else if(array[position - (i+1)] == '/'){
					  numberRoot += array[position - (i+1)]; //Empieza a obtener el numero decimal.
					  operatorNameDetected = name != '/';
					  for(n=i+1; n<position; n++)
		              {
						  isNumberDecimal = isNaN(array[position - (n+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
						  if(isNumberDecimal == false){
						    numberRoot += array[position - (n+1)];
						  }
					    else{
							operatorNameDetected = array[position - (n+1)] != '/';
							operatorNameDetected = name != '/';
						    break;
					      }
					  }
				    }
					
				    break;
		          }
	            }
		      }
		    else
		      {
			    numberRoot += array[position - (i+1)];
			  }
			
		      if(otherOperatorNameDetected == true){
		        break;
		      }
		    }
			
		    var numberRoot_1 = "";
		    for(j=0, len = numberRoot.length; j<len; j++)
		    {
		      numberRoot_1 += numberRoot.charAt(len - (j+1));
		    }
		     numberRoot = numberRoot_1;
		 }
		 var returningVariables = {operatorNameDetected: operatorNameDetected,otherOperatorNameDetected: otherOperatorNameDetected,numberRoot: numberRoot,isNumber: isNumber};
		 return returningVariables;
	}*/

//+------------------------------------------------------------------+
//|      **FUNCION:PartialVerificationOfOperatorsAndFunctions**      |
//+------------------------------------------------------------------+  
	function PartialVerificationOfOperatorsAndFunctions(array,name){

          var nameOfOperators = ['+','-','*','/','(','raizxy','.','%from','raiz','raiz_1',')']; //Nombre de operadores de botones.								   
		  var operatorNameDetected = false;
		  var otherOperatorNameDetected = false;
		  var isNumber = isNaN(array[array.length - 1]); //Verifica si el ultimo caracter del array es un numero ó no.
		  var numberRoot = "";
		  var isNumberDecimal = true;
		  var i, k, n, j, len, len_1;

		  if(isNumber == false)
		  {
	        for(i=0, len = array.length; i<len; i++)
		    {
		      var operatorBeforeTheNumber = isNaN(array[len - (i+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
     
		      if(operatorBeforeTheNumber == true){
			  
			    otherOperatorNameDetected = true;

		        for(k=0, len_1 = nameOfOperators.length; k<len_1; k++)
		        {
		          if(array[len - (i+1)] == nameOfOperators[k]) 
		          {
					operatorNameDetected = true;
					
					if(array[len - (i+1)] == '.'){
					  numberRoot += array[len - (i+1)]; //Empieza a obtener el numero decimal.
					  operatorNameDetected = name != '.';
					  for(n=i+1; n<len; n++)
		              {
						  isNumberDecimal = isNaN(array[len - (n+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
						  if(isNumberDecimal == false){
						    numberRoot += array[len - (n+1)];
						  }
					    else{
							operatorNameDetected = array[len - (n+1)] != '.';
							operatorNameDetected = name != '.';
						    break;
					      }
					  }
				    } 
                  else if(array[len - (i+1)] == '/'){
					  numberRoot += array[len - (i+1)]; //Empieza a obtener el numero decimal.
					  operatorNameDetected = name != '/';
					  for(n=i+1; n<len; n++)
		              {
						  isNumberDecimal = isNaN(array[len - (n+1)]); //Verifica si el caracter del array que precede al numero ó numeros, son operadores ó funciones.
						  if(isNumberDecimal == false){
						    numberRoot += array[len - (n+1)];
						  }
					    else{
							operatorNameDetected = array[len - (n+1)] != '/';
							operatorNameDetected = name != '/';
						    break;
					      }
					  }
				    }
					
				    break;
		          }
	            }
		      }
		    else
		      {
			    numberRoot += array[len - (i+1)];
			  }
			
		      if(otherOperatorNameDetected == true){
		        break;
		      }
		    }
			
		    var numberRoot_1 = "";
		    for(j=0, len = numberRoot.length; j<len; j++)
		    {
		      numberRoot_1 += numberRoot.charAt(len - (j+1));
		    }
		     numberRoot = numberRoot_1;
		 }
		 var returningVariables = {operatorNameDetected: operatorNameDetected,otherOperatorNameDetected: otherOperatorNameDetected,numberRoot: numberRoot,isNumber: isNumber};
		 return returningVariables;
	}
 
//+------------------------------------------------------------------+
//|    **FUNCION:repetitiveExecutionProcedureOperatorsPreceding**    |
//+------------------------------------------------------------------+	
	
	function repetitiveExecutionProcedureOperatorsPreceding(name){ //Funcion que ejecuta procedimientos repetitivos dentro de la **FUNCION:verifyOperators**.
		
		var expressionToCalculate = '';
		
	    arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
	    arrayOperatorsAndFunctions.push(name);
		
		screen.innerHTML = ""; //Se limpia la caja de texto.
		for(i=0, len = arrayScreenContainer.length; i<len; i++)//Nuevamente la caja de texto recibe los elementos del array.
		{  
		  expressionToCalculate += arrayScreenContainer[i];
		}
	     screen.innerHTML = expressionToCalculate;
	}

//+------------------------------------------------------------------+
//|            **FUNCION:continueCalculatingWithTheResult**          |
//+------------------------------------------------------------------+  
	function continueCalculatingWithTheResult(name,element){
		
	  var expressionToCalculate = "";
	  var i, len;
	  
	  if(name == "+" || name == "-" || name == "*" || name == "/" || name == "^2" || name == "raizxy" || name == "%from" || name == "Mod" || name == "^" || name == "F-E"){
	       
		   if(screen1.innerHTML != "")
	       {
		     screen1.innerHTML = ""; //Limpia la caja de texto.
		     statusMemoryResult = true;
		     statusMemory = false;
		     statusNumericalresultsInScreen = false;
			 statusCharactersNumeric = true;
			 statusWithResultInBox = true;
			 statusDeleteCharacter = true;
		     arrayOperatorsAndFunctions.splice(0,arrayOperatorsAndFunctions.length); //Limpia el array.
		     arrayScreenContainer.splice(0,arrayScreenContainer.length); //Limpia el array.
		     arrayGuardingPlaceFromAParenthesis.splice(0,arrayGuardingPlaceFromAParenthesis.length); //Limpia el array.
			 
			 if(name == "^2"){
			   
			   for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		       {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		       }
			   
	           arrayScreenContainer.push('^'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
			   arrayScreenContainer.push('2'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
               arrayOperatorsAndFunctions.push('^');
			   arrayOperatorsAndFunctions.push('2');
			   statusCharactersNumeric = false;
			 }
			 
		   else if(name == "raizxy"){
                
				arrayOperatorsAndFunctions.push(screen.innerHTML);
				arrayOperatorsAndFunctions.push(name);
				arrayOperatorsAndFunctions.push('(');
				arrayScreenContainer.push(screen.innerHTML.fontsize(2).sup());
	            arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
	            arrayScreenContainer.push('('.fontcolor('#FF4500'));
		    }
			 
		   else{
               
               for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		       {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		       }
			   
	           arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
               arrayOperatorsAndFunctions.push(name); 
		     }
			 
			 screen.innerHTML = ""; //Limpia la caja de texto.
			 for(i=0, len = arrayScreenContainer.length; i<len; i++)
		     {  
		       expressionToCalculate += arrayScreenContainer[i];
		     }
			  screen.innerHTML = expressionToCalculate;
			  errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.

			 return true;
	       }
         else if(screen11.innerHTML != ""){
			
		     statusMemoryResult = true;
	         statusMemory = false;
		     statusNumericalresultsInScreen = false;
           }
	  }
	else if(name == "raiz" || name == "raiz_1" || name == "1/" || name == "sin" || name == "cos" || name == "tan" || name == "asin" || name == "acos" || name == "atan" || name == "log" || name == "ln" ||
	        name == "n!" || name == "10^" || name == "e^" || name == "signo"){
	       
		   if(screen1.innerHTML != "")
	       {
			    if(name == "raiz" && screen.innerHTML < 0 || name == "raiz_1" && screen.innerHTML < 0){ 
			       errorDetector(element,false); //Cambia el color del boton a "azul", si es correcta la sintaxis.
				   return true;
		        }
		      else{
			       screen1.innerHTML = ""; //Limpia la caja de texto.
		           statusMemoryResult = true;
		           statusMemory = false;
		           statusNumericalresultsInScreen = false;
			       statusWithResultInBox = true;
			       statusDeleteCharacter = true;
		           arrayOperatorsAndFunctions.splice(0,arrayOperatorsAndFunctions.length); //Limpia el array.
		           arrayScreenContainer.splice(0,arrayScreenContainer.length); //Limpia el array.
		           arrayGuardingPlaceFromAParenthesis.splice(0,arrayGuardingPlaceFromAParenthesis.length); //Limpia el array. 
			    }
			 
			 if(name == "raiz_1"){
				
				arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
                arrayOperatorsAndFunctions.push(name);
				arrayOperatorsAndFunctions.push("(");				
				
				for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		        {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        }
			 }
			 
		   else if(name == "log"){
			    
				for(i=0, len = screen.innerHTML.length; i<len; i++)
		        {  
				   arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        }

			    var partialDetectionGlobal = PartialVerificationOfOperatorsAndFunctions(arrayOperatorsAndFunctions,name);
				arrayOperatorsAndFunctions.push(name); //Almacena la funcion en el array.
				arrayOperatorsAndFunctions.push('(');
			    arrayScreenContainer.push("log");

				 for(i=0, len = partialDetectionGlobal.numberRoot.length; i<len; i++)
		         {  
		           arrayScreenContainer.push(partialDetectionGlobal.numberRoot.charAt(i).fontsize(2).sub());
		         }
				 
                 arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
			 }
			 
		   else if(name == "raiz"){
					
			       arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
                   arrayOperatorsAndFunctions.push(name);
				   for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		           {  
				     arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				     arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		           }				
			 }
			 
		   else if(name == "10^"){
			   
			    arrayScreenContainer.push('10'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayScreenContainer.push('^'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayOperatorsAndFunctions.push('10');
				arrayOperatorsAndFunctions.push('^');
                for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		        {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        }
			  
				statusCharactersNumeric = false; //Desactiva los caracteres numericos.
			 }
			 
		   else if(name == "signo"){
			   
			      if(screen.innerHTML.charAt(0) != "-"){
				  
			        arrayScreenContainer.push('-'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				    arrayOperatorsAndFunctions.push('-');
                    for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		            {  
				      arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				      arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		            }
			      }
                else{
				
                    for(i=1, len = screen.innerHTML.length; i<=len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		            {  
				      arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				      arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		            }
			      }			  
			 }
			 
		   else if(name == "e^"){
			   
			    arrayScreenContainer.push('e'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayScreenContainer.push('^'); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayOperatorsAndFunctions.push('e');
				arrayOperatorsAndFunctions.push('^');
                for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		        {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        }								
				
				statusCharactersNumeric = false; //Desactiva los caracteres numericos.
			 }
			 
		   else if(name == "sin" || name == "cos" || name == "tan" || name == "asin" || name == "acos" || name == "atan" || name == "ln" || name == "n!"){
			    
				arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayScreenContainer.push('('.fontcolor('#FF4500')); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
                arrayOperatorsAndFunctions.push(name);
				arrayOperatorsAndFunctions.push("(");				
                for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		        {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        } 
		     }
			 
		   else{
			   
				arrayScreenContainer.push(converterCharacter(name)); //El array almacena la expresion igual como aparece en pantalla, en la caja de texto "screen".
				arrayOperatorsAndFunctions.push(name);
                for(i=0, len = screen.innerHTML.length; i<len; i++) //El array almacena el resultado que aparece en pantalla,es decir, en la caja de texto "screen".
		        {  
				  arrayScreenContainer.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
				  arrayOperatorsAndFunctions.push(screen.innerHTML.charAt(i)); //Almacena el resultado numerico en el array.
		        }			 
			 }
				 
			 screen.innerHTML = ""; //Limpia la caja de texto.
			 for(i=0, len = arrayScreenContainer.length; i<len; i++)
		     {  
		       expressionToCalculate += arrayScreenContainer[i];
		     }
			  screen.innerHTML = expressionToCalculate;
			  errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
			  return true;
	       
		   }
         else if(screen11.innerHTML != ""){
			
		     statusMemoryResult = true;
	         statusMemory = false;
		     statusNumericalresultsInScreen = false;
           }
	  }
	  return false;
	}
	
//+------------------------------------------------------------------+
//|                  **FUNCION:resetCalculator**                     |
//+------------------------------------------------------------------+

	function resetCalculator(name,element,statusColorMemory){ //Funcion que reinicia la calculadora con el boton "C".
		
		screen.innerHTML = ""; //Limpia la caja de texto.
		screen1.innerHTML = ""; //Limpia la caja de texto.
		arrayOperatorsAndFunctions.splice(0,arrayOperatorsAndFunctions.length); //Limpia el array.
		arrayScreenContainer.splice(0,arrayScreenContainer.length); //Limpia el array.
		arrayGuardingPlaceFromAParenthesis.splice(0,arrayGuardingPlaceFromAParenthesis.length); //Limpia el array.
		scrollScreenX = null;
		statusCharactersNumeric = true;
		statusWithResultInBox = true;
		statusDeleteCharacter = true;
		
		if(statusColorMemory == true){
		statusMemory = false;
	    statusMemoryResult = false;
		statusNumericalresultsInScreen = true;
		screen11.innerHTML = ""; //Limpia la caja de texto.
		document.getElementById("memory").style.backgroundImage = "url('css/imgBoton/boton.png')";
	    document.getElementById("memory_1").style.backgroundImage = "url('css/imgBoton/boton.png')";
	    }
		
		errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
	}

//+------------------------------------------------------------------+
//|                    **FUNCION:clearScreen**                       |
//+------------------------------------------------------------------+
	
	function clearScreen(element){ //Funcion que limpia la caja de texto "screen1" con el boton "CE" y pasa la expresion a resolver, nuevamente a la caja de texto "screen".
		
	  if(screen1.innerHTML != ''){
		  
		screen.innerHTML = ""; //Limpia la caja de texto.
		screen1.innerHTML = ""; //Limpia la caja de texto.
		statusMemoryResult = true;
		statusNumericalresultsInScreen = false;
		statusCharactersNumeric = true;
		statusDeleteCharacter = true;
		statusWithResultInBox = true;
		
		for(var i=0; i<arrayScreenContainer.length; i++)
		 {  
		   screen.innerHTML += arrayScreenContainer[i];
		 }
	      errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
	  }
	else{
		  errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis. 
	  }   
	}
	
//+------------------------------------------------------------------+
//|                   **FUNCION:memoryResult**                       |
//+------------------------------------------------------------------+
	
	function memoryResult(name,element){ //Almacena en memoria el resultado de la expresion matematica.

		if(statusMemory == true && statusNumericalresultsInScreen == true)
		{
		  element.style.backgroundImage = 'none';
		  
		   if(name == "memory"){
		     element.style.backgroundColor = "LimeGreen"; //Cambia el color de fondo del boton "M".
		     screen11.innerHTML = "Memory = " + screen.innerHTML.fontcolor("LimeGreen"); //Se visualiza el resultado de la memoria en la caja de texto "screen11".
		   }
		 else if(name == "memory_1"){
		    element.style.backgroundColor = "DarkTurquoise"; //Cambia el color de fondo del boton "M".
		    screen11.innerHTML = "Memory = " + screen.innerHTML.fontcolor("DarkTurquoise"); //Se visualiza el resultado de la memoria en la caja de texto "screen11".
		   }
		   
		  statusMemory = false;
		  errorMemory = false;
		}
		
	  else if(statusMemoryResult == true && statusMemory == false)
		{
		  var operatorsBasic = ['+','-','*','/','%','^'];
		  
		  for(var i=0; i<operatorsBasic.length; i++)
		  { 
           	if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == operatorsBasic[i])
			{
			  arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length] = quarryingNumbersInText(screen11.innerHTML); //Adiciona caracter numerico ó operador al array.
              arrayScreenContainer[arrayScreenContainer.length] = quarryingNumbersInText(screen11.innerHTML); //Adiciona caracter numerico ó operador al array.
			  
			   if(name == "memory"){
			     screen.innerHTML += quarryingNumbersInText(screen11.innerHTML).fontcolor("LimeGreen");
			   }
			 else if(name == "memory_1"){
			     screen.innerHTML += quarryingNumbersInText(screen11.innerHTML).fontcolor("DarkTurquoise");
			   }
			  
			  element.style.backgroundImage = "url('css/imgBoton/boton.png')";
			  screen11.innerHTML = "";
			  statusMemoryResult = false;
			  statusNumericalresultsInScreen = true;
			  errorMemory = false;
			  break;
			}
		  }
		}

		 if(errorMemory == true && screen11.innerHTML == '' || errorMemory == true && screen11.innerHTML != ''){
		   errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
         }
	   else{
		   errorMemory = false;
	     }
	 }
	
//+------------------------------------------------------------------+
//|                **FUNCION:quarryingNumbersInText**                |
//+------------------------------------------------------------------+
	
	function quarryingNumbersInText(string){
	  
	  var number = '';
	  
	  for(var i=0; i<string.length; i++)
      {
	    var isNumber = isNaN(string.charAt(i)); //Verifica si el caracter es un numero ó no.
	
		if(isNumber == false && string.charAt(i) != " " || string.charAt(i) == ".") //Verifica que el caracter sea un numero y que tambien sea distinto del caracter 'Espacio'.
		{
		  number += string.charAt(i);
		}
	  }

	  return number; 
	}
	
//+------------------------------------------------------------------+
//|                  **FUNCION:deleteCharacter**                     |
//+------------------------------------------------------------------+
	
	function deleteCharacter(name,element){ //Funcion que borra un caracter de la caja de texto con el boton "←".
	     
	     var deleteParenthesis = false;
		 var eliminatingConcludingShape = true;
		 
		 if(screen.innerHTML != "" && statusDeleteCharacter == true){
		 
		   for(var i=0; i<arrayOperatorsAndFunctions.length; i++) //Elimina caracter no final.
		   {
		     if(arrayScreenContainer[i].charAt(26) == "|")
		     {
		       arrayScreenContainer[i] = converterCharacter(arrayOperatorsAndFunctions[i]);
			   arrayOperatorsAndFunctions.splice(i-1,1); //Borra el ultimo caracter del array.
		       arrayScreenContainer.splice(i-1,1);; //Borra el ultimo caracter del array.
			   arrayScreenContainer[i-1] = "|".fontcolor('DeepSkyBlue') + arrayScreenContainer[i-1];
		       eliminatingConcludingShape = false;
			   break;
		     }
		   }
							 
	       if(eliminatingConcludingShape == true) //Elimina caracter final.
	       {
	         if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == ')') //Si se borra un parentesis de cierre, entonces se activa para verificar el estatus de todos los parentesis de la expresion.
		     {
		       deleteParenthesis = true;
		     }
		   
		      arrayOperatorsAndFunctions.splice(arrayOperatorsAndFunctions.length - 1,1); //Borra el ultimo caracter del array.
		      arrayScreenContainer.splice(arrayScreenContainer.length - 1,1);; //Borra el ultimo caracter del array.
			
			  if(arrayOperatorsAndFunctions.length > 0)
			  {
			    name = arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1];
			  }			  
	       }
		    verifyParenthesis(name,false,deleteParenthesis,false);
            screen.innerHTML = ""; //Limpia la caja de texto.
		 
            for(var i=0; i<arrayScreenContainer.length; i++)
	        {
	          screen.innerHTML += arrayScreenContainer[i];
	        }
             errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
		 }
		 else{
			 errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
		   }       		 
    }
	
//+------------------------------------------------------------------+
//|                        **FUNCION:sum**                           |
//+------------------------------------------------------------------+

	function sum(name,element){ //Funcion que resuelve la expresion matematica con la funcion "eval".

	   var operatorsAndFunctions = ['+','-','*','/','.','%from','raiz','raiz_1','raizxy','1/','^','(','sin','cos','tan','asin','acos','atan','log','ln','n!','Deg','F-E','Mod'];
	   var statusSum = true;
	
	   if(arrayOperatorsAndFunctions.length > 0) //Verifica que la sintaxis de la expresion sea correcta, es decir, que la expresion no termine en un operador ó funcion.
	   {
		   for(var i=0; i<operatorsAndFunctions.length; i++)
		   { 
           	 if(arrayOperatorsAndFunctions[arrayOperatorsAndFunctions.length - 1] == operatorsAndFunctions[i] || verifyParenthesis(name,false,false,true) == false)
			 {
			   statusSum = false;
			   break;
			 }
	       }  
	   }
     else
       {
	     statusSum = false;
	   }
	 
	 if(statusSum == true){
		try {
			 screen.innerHTML = ""; //Limpia la caja de texto.
			 screen1.innerHTML = ""; //Limpia la caja de texto.
			 statusMemory = true;
			 statusNumericalresultsInScreen = true;
			 statusCharactersNumeric = false;
			 statusDeleteCharacter = false;
			 statusWithResultInBox = false;
			 calculate(); //Obtiene la nueva sintaxis (string) en la caja de texto.
			 var expression  = screen.innerHTML;
		     screen.innerHTML = eval(expression); //La funcion "eval" evalua la sintaxis (string) de la caja de texto.
			 errorDetector(element,true); //Cambia el color del boton a "azul", si es correcta la sintaxis.
        }
        catch(e){
                 screen.innerHTML = "Syntax ERROR";				 
	    }
	 }
   else{
	    errorDetector(element,false); //Cambia el color del boton a "rojo", si es incorrecta la sintaxis.
   }
	   
	}
	
//+------------------------------------------------------------------+
//|                      **FUNCION:calculate**                       |
//+------------------------------------------------------------------+
	
	function calculate(){ //Funcion que se encarga de verificar y corregir la sintaxis de la exprexion matematica, para que luego sea evaluada por la funcion "sum".
	
		var arrayResultOfOperatorsAndNumbers = new Array();
		var arrayRootxyTotal = new Array();
		var numberx = "";
		var numbery = "";
		var statusNumber = true;
		var statusPotentiation = false;
		var statusPercentage = false;
		var statusRootSquare = false;
		var rootSquareTotal = 0;
        var statusTrigonometricIdentities = '';
		var statusOthersRoot = false;
		var statusResidueDivision = false;
		var statusRootxy = false;

	     for(var i=0; i<arrayOperatorsAndFunctions.length; i++)
		 {
		    var isNumber = isNaN(arrayOperatorsAndFunctions[i]); //Verifica si el caracter es un numero ó no.
		   
			if (isNumber == false || arrayOperatorsAndFunctions[i] == '.' || arrayOperatorsAndFunctions[i] == 'e' || arrayOperatorsAndFunctions[i] == '/') //Es un numero entero ó decimal ó numero euler.
			{ 
			  if (statusNumber == true)
			  {
			    numberx += arrayOperatorsAndFunctions[i]; //Almacena el numero base para la potenciacion.
				arrayResultOfOperatorsAndNumbers[arrayResultOfOperatorsAndNumbers.length] = arrayOperatorsAndFunctions[i];
			  }
			  
		    else if(statusNumber == false)
			  {
			     numbery += arrayOperatorsAndFunctions[i]; //Almacena el numero exponente para la potenciacion.
		      }
			}
			
		  else if(isNumber == true) //Es un operador.
		    {
			  if (arrayOperatorsAndFunctions[i] == "^") //Calcula la potencia de un numero.
			  {
			    arrayResultOfOperatorsAndNumbers = verifyArrayResultOfOperatorsAndNumbers(arrayResultOfOperatorsAndNumbers); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusPotentiation = true;
		      }
			  
			else if (arrayOperatorsAndFunctions[i] == "%from") //Calcula el porcentaje de un numero.
			  {	  
			    arrayResultOfOperatorsAndNumbers = verifyArrayResultOfOperatorsAndNumbers(arrayResultOfOperatorsAndNumbers); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusPercentage = true;  
			  }
			  
			else if (arrayOperatorsAndFunctions[i] == "Mod") //Obtiene el residuo de la division.
			  {
			    arrayResultOfOperatorsAndNumbers = verifyArrayResultOfOperatorsAndNumbers(arrayResultOfOperatorsAndNumbers); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusResidueDivision = true;
		      }
			  
			else if (arrayOperatorsAndFunctions[i] == "raiz" || arrayOperatorsAndFunctions[i] == "raiz_1") //Obtiene la raiz cuadrada de un numero.
			  {
			    var arrayRoot = new Array();
				var arrayRootInternal = new Array();
				var arrayQuantifyingExpressionToResolve = new Array();
				
			    for(var j=i; j<arrayOperatorsAndFunctions.length; j++) //Contabiliza el numero de raices cuadradas a calcular de un numero.
		        {
				   if(arrayOperatorsAndFunctions[j] == 'raiz' || arrayOperatorsAndFunctions[j] == "raiz_1")
				   {
				     rootSquareTotal++;
					 statusNumber = false;
				   }
				 else
                   {
				     break;
				   }				 
		        }
				
				i += rootSquareTotal - 1; //Le suma a la variable 'i' del for principal el numero de elementos igual al name 'raiz'.
				
				   if(arrayOperatorsAndFunctions[i+1] == '(') //Verifica si despues de la raiz ó de las raices, sigue el operador name '('.
				   {
				     var n = i+1;
					 var m = 0;
				     arrayQuantifyingExpressionToResolve = quantifyingExpressionToResolve(arrayOperatorsAndFunctions,n);
					 var lettoverShapesOfTheExpression = arrayQuantifyingExpressionToResolve[arrayQuantifyingExpressionToResolve.length-1];
					 arrayQuantifyingExpressionToResolve.splice(arrayQuantifyingExpressionToResolve.length-2,2); //Limpia el array.

				     for(var p=i+2; p<arrayOperatorsAndFunctions.length; p++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis en la raiz.
		             {
					   m++;
					   //Verifica si dentro de la raiz ó raices, hay una segunda raiz o funciones que resolver y si lo procede el operador name '('.
					   if((arrayOperatorsAndFunctions[p] == 'raiz' || arrayOperatorsAndFunctions[p] == 'raiz_1') && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'sin' && arrayOperatorsAndFunctions[p+1] == '(' ||
					      arrayOperatorsAndFunctions[p] == 'cos' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'tan' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'asin' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'acos' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'atan' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'log' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'ln' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'n!' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'raizxy' && arrayOperatorsAndFunctions[p+1] == '(')
					   {
					     var operationToApply = arrayOperatorsAndFunctions[p];
					     var shapesOfTheFunction = arrayQuantifyingExpressionToResolve[1];
						 var h = 0;
					     arrayQuantifyingExpressionToResolve.splice(0,2); //Limpia el array.
						 
					     for(var k=p+2; k<arrayOperatorsAndFunctions.length; k++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis de la segunda raiz o raices.
		                 {
						   h++;
						   
						   if(h < shapesOfTheFunction + 1)
					       {
					         arrayRootInternal[arrayRootInternal.length] = arrayOperatorsAndFunctions[k]; // El array obtiene los numeros y operadores de la segunda raiz ó raices.
							 p++; //Le suma a la variable 'p' del for anterior el numero de elementos 'name'.
							 i++;
					       }
					     else
					       {
						     p += 2;
							 i += 3;
							 arrayRoot[arrayRoot.length] = operationToApply;
					         arrayRoot[arrayRoot.length] = calculatePartial(arrayRootInternal);
							 arrayRootInternal.splice(0,arrayRootInternal.length); //Limpia el array.
					         break;
					       }
						 }
					   }
					   
					 else if(m < lettoverShapesOfTheExpression + 1) //Le suma 1 a la ultima variable para que el array pueda tomar todos los caracteres y luego lo pase a calcular en la siguiente instruccion.
					   {
					     arrayRoot[arrayRoot.length] = arrayOperatorsAndFunctions[p];
						 i++; //Le suma cada elemento que se encuentra dentro de la raiz a la variable 'i' del for principal, es decir, los elementos que se encuentran dentro de los parentesis.
					   }
					   
					 else
					   {
					     i += 2;
					     numbery = calculatePartial(arrayRoot);
					     break;
					   }
					 }
				   }

		        statusRootSquare = true;
			  }
			         //Realiza calculos relacionados con las identidades trigonometricas y otras funciones.
			else if (arrayOperatorsAndFunctions[i] == "sin" || arrayOperatorsAndFunctions[i] == "cos" || arrayOperatorsAndFunctions[i] == "tan" || arrayOperatorsAndFunctions[i] == "asin" || 
			         arrayOperatorsAndFunctions[i] == "acos" || arrayOperatorsAndFunctions[i] == "atan" || arrayOperatorsAndFunctions[i] == "log" || arrayOperatorsAndFunctions[i] == "ln" || 
					 arrayOperatorsAndFunctions[i] == "n!")
			  {
			       var arrayRoot = new Array();
				   var arrayRootInternal = new Array();
				   var arrayQuantifyingExpressionToResolve = new Array();
				   var TrigonometricIdentity = arrayOperatorsAndFunctions[i];
				
			       if(arrayOperatorsAndFunctions[i+1] == '(') //Verifica si despues de la raiz ó de las raices, sigue el operador name '('.
				   {
				     var n = i+1;
					 var m = 0;
				     arrayQuantifyingExpressionToResolve = quantifyingExpressionToResolve(arrayOperatorsAndFunctions,n);
					 var lettoverShapesOfTheExpression = arrayQuantifyingExpressionToResolve[arrayQuantifyingExpressionToResolve.length-1];
					 arrayQuantifyingExpressionToResolve.splice(arrayQuantifyingExpressionToResolve.length-2,2); //Limpia el array.

				     for(var p=i+2; p<arrayOperatorsAndFunctions.length; p++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis en la raiz.
		             {
					   m++;
					   //Verifica si dentro de la raiz ó raices, hay una segunda raiz o funciones que resolver y si lo procede el operador name '('.
					   if((arrayOperatorsAndFunctions[p] == 'raiz' || arrayOperatorsAndFunctions[p] == 'raiz_1') && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'sin' && arrayOperatorsAndFunctions[p+1] == '(' ||
					      arrayOperatorsAndFunctions[p] == 'cos' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'tan' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'asin' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'acos' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'atan' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'log' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'ln' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'n!' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'raizxy' && arrayOperatorsAndFunctions[p+1] == '(')
					   {
					     var operationToApply = arrayOperatorsAndFunctions[p];
					     var shapesOfTheFunction = arrayQuantifyingExpressionToResolve[1];
						 var h = 0;
					     arrayQuantifyingExpressionToResolve.splice(0,2); //Limpia el array.
						 
					     for(var k=p+2; k<arrayOperatorsAndFunctions.length; k++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis de la segunda raiz o raices.
		                 {
						   h++;
						   
						   if(h < shapesOfTheFunction + 1)
					       {
					         arrayRootInternal[arrayRootInternal.length] = arrayOperatorsAndFunctions[k]; // El array obtiene los numeros y operadores de la segunda raiz ó raices.
							 p++; //Le suma a la variable 'p' del for anterior el numero de elementos 'name'.
							 i++;
					       }
					     else
					       {
						     p += 2;
							 i += 3;
							 arrayRoot[arrayRoot.length] = operationToApply;
					         arrayRoot[arrayRoot.length] = calculatePartial(arrayRootInternal);
							 arrayRootInternal.splice(0,arrayRootInternal.length); //Limpia el array.
					         break;
					       }
						 }
					   }
					   
					 else if(m < lettoverShapesOfTheExpression + 1) //Le suma 1 a la ultima variable para que el array pueda tomar todos los caracteres y luego lo pase a calcular en la siguiente instruccion.
					   {
					     arrayRoot[arrayRoot.length] = arrayOperatorsAndFunctions[p];
						 i++; //Le suma cada elemento que se encuentra dentro de la raiz a la variable 'i' del for principal, es decir, los elementos que se encuentran dentro de los parentesis.
					   }
					   
					 else
					   {
					     i += 2;
					     numbery = calculatePartial(arrayRoot);
					     break;
					   }
					 }
				   }
			    
				if(TrigonometricIdentity == "log"){ //Verifica si existe un numero antes de la funcion logaritmica, y si existe, los elimina.
				   arrayResultOfOperatorsAndNumbers = verifyArrayResultOfOperatorsAndNumbers(arrayResultOfOperatorsAndNumbers); //Verifica y corrige los elementos del array.
				}
				
			    statusNumber = false;
		        statusTrigonometricIdentities = TrigonometricIdentity;
		      }
			  
			else if (arrayOperatorsAndFunctions[i] == "raizxy") //Calcula la raiz mayor ó igual a 3 de un numero.
			  {
			    var arrayRoot = new Array();
				var arrayRootInternal = new Array();
				var arrayQuantifyingExpressionToResolve = new Array();
				
				for(var j=i; j<arrayOperatorsAndFunctions.length; j++) //Contabiliza el numero de raices cuadradas a calcular de un numero.
		        {
				   if(arrayOperatorsAndFunctions[j] == 'raizxy')
				   {
				     arrayRootxyTotal[arrayRootxyTotal.length] = arrayOperatorsAndFunctions[j-1];
					 i++;
					 statusNumber = false;
				   }
				 else
                   {
				     i--;
				     break;
				   }				 
		        }
				
				   if(arrayOperatorsAndFunctions[i+1] == '(') //Verifica si despues de la raiz ó de las raices, sigue el operador name '('.
				   {
				     var n = i+1;
					 var m = 0;
				     arrayQuantifyingExpressionToResolve = quantifyingExpressionToResolve(arrayOperatorsAndFunctions,n);
					 var lettoverShapesOfTheExpression = arrayQuantifyingExpressionToResolve[arrayQuantifyingExpressionToResolve.length-1];
					 arrayQuantifyingExpressionToResolve.splice(arrayQuantifyingExpressionToResolve.length-2,2); //Limpia el array.

				     for(var p=i+2; p<arrayOperatorsAndFunctions.length; p++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis en la raiz.
		             {
					   m++;
					   //Verifica si dentro de la raiz ó raices, hay una segunda raiz o funciones que resolver y si lo procede el operador name '('.
					   if((arrayOperatorsAndFunctions[p] == 'raiz' || arrayOperatorsAndFunctions[p] == 'raiz_1') && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'sin' && arrayOperatorsAndFunctions[p+1] == '(' ||
					      arrayOperatorsAndFunctions[p] == 'cos' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'tan' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'asin' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'acos' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'atan' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'log' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'ln' && arrayOperatorsAndFunctions[p+1] == '(' || arrayOperatorsAndFunctions[p] == 'n!' && arrayOperatorsAndFunctions[p+1] == '(' ||
						  arrayOperatorsAndFunctions[p] == 'raizxy' && arrayOperatorsAndFunctions[p+1] == '(')
					   {
					     var operationToApply = arrayOperatorsAndFunctions[p];
					     var shapesOfTheFunction = arrayQuantifyingExpressionToResolve[1];
						 var h = 0;
					     arrayQuantifyingExpressionToResolve.splice(0,2); //Limpia el array.
						 
					     for(var k=p+2; k<arrayOperatorsAndFunctions.length; k++) //El array obtiene los numeros y operadores que se encuentran dentro del parentesis de la segunda raiz o raices.
		                 {
						   h++;
						   
						   if(h < shapesOfTheFunction + 1)
					       {
					         arrayRootInternal[arrayRootInternal.length] = arrayOperatorsAndFunctions[k]; // El array obtiene los numeros y operadores de la segunda raiz ó raices.
							 p++; //Le suma a la variable 'p' del for anterior el numero de elementos 'name'.
							 i++;
					       }
					     else
					       {
						     p += 2;
							 i += 3;
							 arrayRoot[arrayRoot.length] = operationToApply;
					         arrayRoot[arrayRoot.length] = calculatePartial(arrayRootInternal);
							 arrayRootInternal.splice(0,arrayRootInternal.length); //Limpia el array.
					         break;
					       }
						 }
					   }
					   
					 else if(m < lettoverShapesOfTheExpression + 1) //Le suma 1 a la ultima variable para que el array pueda tomar todos los caracteres y luego lo pase a calcular en la siguiente instruccion.
					   {
					     arrayRoot[arrayRoot.length] = arrayOperatorsAndFunctions[p];
						 i++; //Le suma cada elemento que se encuentra dentro de la raiz a la variable 'i' del for principal, es decir, los elementos que se encuentran dentro de los parentesis.
					   }
					   
					 else
					   {
					     i += 2;
					     numbery = calculatePartial(arrayRoot);
					     break;
					   }
					 }
				   }
				   
                arrayResultOfOperatorsAndNumbers = verifyArrayResultOfOperatorsAndNumbers(arrayResultOfOperatorsAndNumbers); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusRootxy = true;
		      }
			  
		    else //Otros operadores.
			  {
			  
		  //Funcion que realiza las operaciones matematicas.				 
            arrayResultOfOperatorsAndNumbers = resolveOperations(arrayResultOfOperatorsAndNumbers,numberx,numbery,statusPotentiation,statusPercentage,statusRootSquare,
			                                                     rootSquareTotal,statusTrigonometricIdentities,statusResidueDivision,statusRootxy,arrayRootxyTotal);																 
					
				    if (arrayOperatorsAndFunctions[i] == "pi")
			        {
			          arrayResultOfOperatorsAndNumbers[arrayResultOfOperatorsAndNumbers.length] = "3.14";
			        }
					
			      else{
			          arrayResultOfOperatorsAndNumbers[arrayResultOfOperatorsAndNumbers.length] = arrayOperatorsAndFunctions[i];
				      numberx = "";
			      }

				  numberx = "";
				  numbery = "";
				  statusNumber = true;
				  statusPotentiation = false;
				  statusPercentage = false;
				  statusRootSquare = false;
				  rootSquareTotal = 0;
				  statusTrigonometricIdentities = '';
				  statusResidueDivision = false;
				  statusRootxy = false;
		      }
			  
		    }		
		 }

	   //Funcion que realiza las operaciones matematicas.	
	     arrayResultOfOperatorsAndNumbers = resolveOperations(arrayResultOfOperatorsAndNumbers,numberx,numbery,statusPotentiation,statusPercentage,statusRootSquare,
		                                                      rootSquareTotal,statusTrigonometricIdentities,statusResidueDivision,statusRootxy,arrayRootxyTotal);

	   //Verifica y corrige los signos de la expresion.
		 arrayResultOfOperatorsAndNumbers = multiplicationSign(arrayResultOfOperatorsAndNumbers);														  

	   //Pasa el array a la caja de texto "screen", para luego ser evaluada la expresion por la funcion "eval".
		 for(var i=0; i<arrayResultOfOperatorsAndNumbers.length; i++)
		 {
	       screen.innerHTML += arrayResultOfOperatorsAndNumbers[i];
		 }

	   //Luego pasa el array a la caja de texto "screen1" para ser visualizado por el usuario.
		 for(var i=0; i<arrayScreenContainer.length; i++)
		 {
		   screen1.innerHTML += arrayScreenContainer[i];
		 }
	}

//+------------------------------------------------------------------+
//|        **FUNCION:verifyArrayResultOfOperatorsAndNumbers**        |
//+------------------------------------------------------------------+
	
    function verifyArrayResultOfOperatorsAndNumbers(array){
	
      var arrayTotal = array.length - 1;
	  var isNumberArray;
			  
	  for(var h=arrayTotal; h>-1; h--)
	  {
	    isNumberArray = isNaN(array[h]);

	    if (isNumberArray == false || array[h] == '.' || array[h] == 'e' || array[h] == '/') //Es un numero entero ó decimal ó numero de euler.
	    {
		  array.splice(h,1);
	    }
	  else
	    {
	      break;
	    }
	  }
	  return array;
    }

//+------------------------------------------------------------------+
//|                **FUNCION:multiplicationSign**                    |
//+------------------------------------------------------------------+
	
    function multiplicationSign(array){

      for(var i=0; i<array.length; i++)
	  {
	  
	     if(array[i] == "+" && array[i+1] < 0)
		 {
		   array[i] = "-";
		   array[i+1] = array[i+1] * -1;
		 }
	   else if(array[i] == "-" && array[i+1] < 0)
		 {
		   array[i] = "+";
		   array[i+1] = array[i+1] * -1;
		 }
	  }

	  return array;
    }

//+------------------------------------------------------------------+
//|           **FUNCION:quantifyingExpressionToResolve**             |
//+------------------------------------------------------------------+
	
    function quantifyingExpressionToResolve(array,j){

	  var array_1 = new Array();
	  var lettoverShapesOfTheExpression = 0;
	  var n = 0;
	  var m = 0;
	  
      for(var i=j; i<array.length; i++)
	  {
	    lettoverShapesOfTheExpression++;
		
		if(array[i] == "("){
			  n++;
			}
		  else if(array[i] == ")"){
		      m++;
			}
		
		
	    if((array[i] == 'raiz' || array[i] == 'raiz_1') && array[i+1] == '(' || array[i] == 'sin' && array[i+1] == '(' || array[i] == 'cos' && array[i+1] == '(' || array[i] == 'tan' && array[i+1] == '(' ||
		   array[i] == 'asin' && array[i+1] == '(' || array[i] == 'acos' && array[i+1] == '(' || array[i] == 'atan' && array[i+1] == '(' || array[i] == 'log' && array[i+1] == '(' || 
		   array[i] == 'ln' && array[i+1] == '(' || array[i] == 'n!' && array[i+1] == '(' || array[i] == 'raizxy' && array[i+1] == '(')
		{
		  var internalShapeofTheFunction = 0;
		  var functionMathematics = array[i];
		  var n_1 = 0;
		  var m_1 = 0;
		  
		  for(var k=i+1; k<array.length; k++)
	      {
		    internalShapeofTheFunction++;
			i++;
			
		    if(array[k] == "("){
			  n_1++;
			}
		  else if(array[k] == ")"){
		      m_1++;
			}
			
			if(n_1 == m_1){
			  array_1[array_1.length] = functionMathematics;
			  array_1[array_1.length] = internalShapeofTheFunction - 2;
			  break;
			}
		  }
		}

		if(n == m){
		  array_1[array_1.length] = "Total Expression";
	      array_1[array_1.length] = lettoverShapesOfTheExpression - 2; //Le restamos los parentesis de la expresion general.
		  break;
	    }
	  }
	  
	  return array_1;
    }
	
//+------------------------------------------------------------------+
//|                 **FUNCION:resolveOperations**                    |
//+------------------------------------------------------------------+
	
    function resolveOperations(array,numberx,numbery,Potentiation,Percentage,RootSquare,rootSquareTotal,statusTrigonometricIdentities,residueDivision,rootxy,arrayRootxy)
	{
         if(Potentiation == true) //Calcula la potenciacion.
	     {
		   var potencia = '';
		   
		   if(numberx == 'e')
		   {
		     potencia = Math.exp(numbery);
		     array[array.length] = potencia;
		   }
		 else
		   {
		     potencia = Math.pow(numberx,numbery);
		     array[array.length] = potencia;
		   }
		 }
		 
	   else if(Percentage == true) //Calcula la potenciacion.
		 {
		   var porcentaje;
		   var operatorDivisiony = false;
		   var operatorDivisionx = false;
		   var getNumberDividend = '';
		   var getNumberDivider = '';
		   var getNewNumbery = '';
		   var getNewNumberx = '';

		   for(var j=0; j<numbery.length; j++) //verifica si la expresion tiene el operador "/".
		   {
			    if(numbery.charAt(j) == "/"){
				    operatorDivisiony = true; //Obtiene el numero para sacarle la raiz cuadrada.
					break;
			    } 
		   }
		   
		   for(var j=0; j<numberx.length; j++) //verifica si la expresion tiene el operador "/".
		   {
			    if(numberx.charAt(j) == "/"){
				    operatorDivisionx = true; //Obtiene el numero para sacarle la raiz cuadrada.
					break;
			    } 
		   }

		   if(operatorDivisiony == true || operatorDivisionx == true){ //Aplica solo cuando el numero al que se le va a sacar la raiz cuadrada no esta encerrado por parentesis.
			   
			  if(operatorDivisionx == true){
				  
				for(var k=0; k<numberx.length; k++)
		        {
			         if(numberx.charAt(k) != "/"){
				       getNumberDividend += numberx.charAt(k); //Obtiene el numero para sacarle la raiz cuadrada.
			         }
			       else{
					
					   for(var h=k+1; h<numberx.length; h++) //Calcula un numero determinado de raices de un numero.
		               {
					     getNewNumberx += numberx.charAt(h); //Obtiene el numero que divide a la raiz cuadrada.
					   }
				        numberx = getNewNumberx;
                        break;					
			         }  
			    }
			  }

			  if(operatorDivisiony == true){
				  
                for(var m=0; m<numbery.length; m++)
		        {
			         if(numbery.charAt(m) != "/"){
					   getNewNumbery += numbery.charAt(m); //Obtiene el numero que divide a la raiz cuadrada.
			         }
			       else{
					
					   for(var h=m+1; h<numbery.length; h++) //Calcula un numero determinado de raices de un numero.
		               {
					     getNumberDivider += numbery.charAt(h); //Obtiene el numero para sacarle la raiz cuadrada.
					   }
					    numbery = getNewNumbery;
                        break;					
			         }  
			    }
			  }

                 
				 if(getNumberDivider != '' && getNumberDividend != ''){
					porcentaje = (numberx*numbery)/100;
					porcentaje = eval(porcentaje/getNumberDivider);
                    porcentaje = eval(getNumberDividend/porcentaje); 
				 }
			   else if(getNumberDivider != ''){
					porcentaje = (numberx*numbery)/100;
					porcentaje = eval(porcentaje/getNumberDivider); 
				 }
			   else if(getNumberDividend != ''){
					porcentaje = (numberx*numbery)/100;
                    porcentaje = eval(getNumberDividend/porcentaje); 
				 }
                 				 
		   }
		 else{
			   porcentaje = (numberx*numbery)/100;  
		   }
		
		   array[array.length] = porcentaje;
		 }
		 
	   else if(RootSquare == true) //Calcula la raiz cuadrada.
		 {
		   var root;
		   var getNumberForRoot = '';
		   var getNumberForDivision = '';
		   var operatorDivision = false;
		   
		   for(var j=0; j<numbery.length; j++) //verifica si la expresion tiene el operador "/".
		   {
			    if(numbery.charAt(j) == "/"){
				    operatorDivision = true; //Obtiene el numero para sacarle la raiz cuadrada.
					break;
			    } 
		   }

		   if(operatorDivision == true){
			   
			    for(var k=0; k<numbery.length; k++)
		        {
			         if(numbery.charAt(k) != "/"){
				       getNumberForRoot += numbery.charAt(k); //Obtiene el numero para sacarle la raiz cuadrada.
			         }
			       else{
					
					   for(var h=k+1; h<numbery.length; h++) //Calcula un numero determinado de raices de un numero.
		               {
					     getNumberForDivision += numbery.charAt(h); //Obtiene el numero que divide a la raiz cuadrada.
					   }
				        root = Math.sqrt(getNumberForRoot);
                        break;					
			         }  
			    }   
		   }
		 else{
			   root = Math.sqrt(numbery);  
		   }
		   
		   if(rootSquareTotal>1) //Indica el numero de veces que se le aplica la raiz cuadrada a un numero.
		   {
		     for(var j=0; j<rootSquareTotal-1; j++) //Calcula un numero determinado de raices de un numero.
		     {
			   root = Math.sqrt(root);
			 }
		   }
		   
		   if(getNumberForDivision != ''){ //Divide a la raiz por el divisor obtenido.
			 root = eval(root/getNumberForDivision); 
		   }
		   
		   array[array.length] = root;
		 }
		
	  else if(statusTrigonometricIdentities == 'sin') //Obtiene el resultado del seno de un numero.
		{
		   var sin = Math.sin(numbery);
		   array[array.length] = sin;
		}
		
	  else if(statusTrigonometricIdentities == 'cos') //Obtiene el resultado del coseno de un numero.
		{
		   var cos = Math.cos(numbery);
		   array[array.length] = cos;
		}
				
	  else if(statusTrigonometricIdentities == 'tan') //Obtiene el resultado de la tangente de un numero.
		{
		   var tan = Math.tan(numbery);
		   array[array.length] = tan;	  
		}
		
	  else if(statusTrigonometricIdentities == 'asin') //Obtiene el resultado de la tangente de un numero.
		{
		   var asin = Math.asin(numbery);
		   array[array.length] = asin;		   
		}
		
	  else if(statusTrigonometricIdentities == 'acos') //Obtiene el resultado de la tangente de un numero.
		{
		   var acos = Math.acos(numbery);
		   array[array.length] = acos;		  
		}
		
	  else if(statusTrigonometricIdentities == 'atan') //Obtiene el resultado de la tangente de un numero.
		{
		   var atan = Math.atan(numbery);
		   array[array.length] = atan;	  
		}
		
	  else if(statusTrigonometricIdentities == 'log') //Obtiene el logaritmo natural de un numero.
		{
		   numberx = eval(numberx);

		   var log = Math.log(numbery)/Math.log(numberx);
		   array[array.length] = log;
		}
		
	  else if(statusTrigonometricIdentities == 'ln') //Obtiene el logaritmo neperiano.
		{
		   var ln = Math.log(numbery);
		   array[array.length] = ln;		  
		}
		
	  else if(statusTrigonometricIdentities == 'n!') //Obtiene el factorial de un numero.
		{
		   var factorial = 1;
		   
		   for (i=1; i<=numbery; i++){
		     factorial = factorial * i;
		   }
		   
		   array[array.length] = factorial;
		}
		
	  else if(residueDivision == true) //Obtiene el residuo de la division.
		{
		   var mod = numberx % numbery;
		   array[array.length] = mod;		  
		}
		
		else if(rootxy == true) //Obtiene la raiz igual ó mayor a 3 de un numero.
		{
		   var f = eval(numberx);
		   numberx = eval(1/f);

		   var rootxy = Math.pow(numbery,numberx);

		   if(arrayRootxy.length>1)
		   {
		     for(var j=arrayRootxy.length-2; j>-1; j--) //Calcula un numero determinado de raices de un numero.
		     {
			   rootxy = Math.pow(rootxy,1/arrayRootxy[j]);
			 }
		   }
		   
           array[array.length] = rootxy;
		   
		}
		
		return array;
    }
	
//+------------------------------------------------------------------+
//|                  **FUNCION:calculatePartial**                    |
//+------------------------------------------------------------------+
	
	function calculatePartial(array){ //Realiza calculos parciales dentro de la expresion a resolver.
	
		var numberx = "";
		var numbery = "";
		var statusNumber = true;
		var statusPotentiation = false;
		var statusPercentage = false;
		var statusRootSquare = false;
		var rootSquareTotal = 0;
        var statusTrigonometricIdentities = '';
		var statusOthersRoot = false;
		var statusResidueDivision = false;
		var statusRootxy = false;
		var arrayRootxyTotal = new Array();
		var arrayResult = new Array();
		
	     for(var i=0; i<array.length; i++)
		 {
		    var isNumber = isNaN(array[i]); //Verifica si el caracter es un numero ó no.

			if (isNumber == false || array[i] == '.' || array[i] == 'e' || array[i] == '/') //Es un numero entero ó decimal ó numero euler.
			{
			  if (statusNumber == true)
			  {
			    numberx += array[i]; //Almacena el numero base para la potenciacion.
				arrayResult[arrayResult.length] = array[i];
			  }
		    else if(statusNumber == false)
			  {
			     numbery += array[i]; //Almacena el numero exponente para la potenciacion.
		      }
			}
		  else if(isNumber == true) //Es un operador.
		    {
			  if (array[i] == "^") //Calcula la potencia de un numero.
			  {
			    arrayResult = verifyArrayResultOfOperatorsAndNumbers(arrayResult); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusPotentiation = true;
		      }
			else if (array[i] == "%from") //Calcula el porcentaje de un numero.
			  {	  
			    arrayResult = verifyArrayResultOfOperatorsAndNumbers(arrayResult); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusPercentage = true;  
			  }
			else if (array[i] == "raiz" || array[i] == "raiz_1") //Obtiene la raiz cuadrada de un numero.
			  {
			    for(var j=i; j<array.length; j++) //Contabiliza el numero de raices a calcular.
		        {
				   if(array[j] == 'raiz' || array[j] == 'raiz_1')
				   {
				     rootSquareTotal++;
				   }
				 else
                   {
				     break;
				   }				 
		        }
				
				i += rootSquareTotal - 1; //Le suma a la variable 'i' del for principal el numero de elementos igual al name 'raiz'			   
			    statusNumber = false;
		        statusRootSquare = true;
			  }
			  
			else if (array[i] == "sin" || array[i] == "cos" || array[i] == "tan" || array[i] == "asin" || array[i] == "acos" ||
			         array[i] == "atan" || array[i] == "log" || array[i] == "ln" || array[i] == "n!") //Realiza calculos relacionados con las identidades trigonometricas.
			  {
			    statusNumber = false;
		        statusTrigonometricIdentities = array[i];
		      }
			  
			else if (array[i] == "Mod") //Obtiene el residuo de la division.
			  {
			    arrayResult = verifyArrayResultOfOperatorsAndNumbers(arrayResult); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusResidueDivision = true;
		      }
			  
			else if (array[i] == "raizxy") //Calcula la raiz mayor ó igual a 3 de un numero.
			  {

			    for(var j=i; j<array.length; j++) //Contabiliza el numero de raices cuadradas a calcular de un numero.
		        {
				   if(array[j] == 'raizxy')
				   {
				     arrayRootxyTotal[arrayRootxyTotal.length] = array[j-1];
					 i++;
					 statusNumber = false;
				   }
				 else
                   {
				     i--;
				     break;
				   }				 
		        }
				
			    arrayResult = verifyArrayResultOfOperatorsAndNumbers(arrayResult); //Verifica y corrige los elementos del array.
			    statusNumber = false;
		        statusRootxy = true;
		      }
			  
		    else //Otros operadores.
			  {
			  
		  //Funcion que realiza las operaciones matematicas.	
	        arrayResult = resolveOperations(arrayResult,numberx,numbery,statusPotentiation,statusPercentage,statusRootSquare,rootSquareTotal,
			                                statusTrigonometricIdentities,statusResidueDivision,statusRootxy,arrayRootxyTotal);																												
					
				    if (array[i] == "pi")
			        {
			          arrayResult[arrayResult.length] = "3.14";
			        }
					
			      else{
			          arrayResult[arrayResult.length] = array[i];
				      numberx = "";
			      }
				  
				  numberx = "";
				  numbery = "";
				  statusNumber = true;
				  statusPotentiation = false;
				  statusPercentage = false;
				  statusRootSquare = false;
				  rootSquareTotal = 0;
				  statusTrigonometricIdentities = '';
				  statusResidueDivision = false;
				  statusRootxy = false;
		      }
			  
		    }		
		 }

	   //Funcion que realiza las operaciones matematicas.	
	     arrayResult = resolveOperations(arrayResult,numberx,numbery,statusPotentiation,statusPercentage,statusRootSquare,rootSquareTotal,
			                             statusTrigonometricIdentities,statusResidueDivision,statusRootxy,arrayRootxyTotal);

       //Verifica y corrige los signos de la expresion.
		 arrayResult = multiplicationSign(arrayResult);
		 
		 var expression	= '';									 

	   //Pasa el array a la variable.
		 for(var i=0; i<arrayResult.length; i++)
		 {
	       expression += arrayResult[i];
		 }
		 expression = eval(expression);
		 return expression; //Evalua la exprexion.
	}
	
//+------------------------------------------------------------------+
//|               **FUNCION:showCalculatorStandard**                 |
//+------------------------------------------------------------------+
	
	function showCalculatorStandard(element){
	
	var name = element.getAttribute("name");
    document.getElementById('Calculator-Standard').style.display = 'block';
	document.getElementById('Calculator-Scientific').style.display = 'none';
	//document.getElementById('Calculator-Converter').style.display = 'none';
	document.getElementById('left').style.display = 'none';
	document.getElementById('right').style.display = 'none';
	document.getElementById('Expression#1').style.display = 'none';
	document.getElementById('Expression#2').style.display = 'none';
	document.getElementById('Expression#3').style.display = 'none';
	document.getElementById('Expression#4').style.display = 'none';
	document.getElementById('lineSeparation').style.backgroundColor = "Limegreen";
	resetCalculator(name);
	}
	
//+------------------------------------------------------------------+
//|               **FUNCION:showCalculatorScientific**               |
//+------------------------------------------------------------------+
	
	function showCalculatorScientific(element){
	
	var name = element.getAttribute("name");
    document.getElementById('Calculator-Standard').style.display = 'none';
	document.getElementById('Calculator-Scientific').style.display = 'block';
	//document.getElementById('Calculator-Converter').style.display = 'none';
	document.getElementById('left').style.display = 'none';
	document.getElementById('right').style.display = 'none';
	document.getElementById('Expression#1').style.display = 'none';
	document.getElementById('Expression#2').style.display = 'none';
	document.getElementById('Expression#3').style.display = 'none';
	document.getElementById('Expression#4').style.display = 'none';
	document.getElementById('lineSeparation').style.backgroundColor = "DarkTurquoise";
	resetCalculator(name);
	}
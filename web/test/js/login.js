/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/
/* 
function login() {
    var name = $("#userName").val();
    var pwd = $("#userPwd").val();
    $.ajax({
        url: '/api/v1/auth/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'name': name,
            'password': pwd
        }),
        success: function(data) {
            window.sessionStorage.setItem("X_Session_Token", data)
            window.location.href = '/?X-Session-Token=' + data;
            var selectedGateway = JSON.parse(window.sessionStorage.getItem('selectedGateway'))
            if (selectedGateway) {
                var addr = {
                    "hostIP": selectedGateway.address
                };
                $.ajax({
                    url: '/api/v1/proxy',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(addr),
                    headers: {
                        "X-Session-Token": window.sessionStorage.getItem("X_Session_Token")
                    },
                    success: function(data) {
                        //alert("Already change gateway to " + gatewayManagementModule.selectedRow.name);
                    }
                });
            }
        }
    });

}

$(document).ready(function() {
    $(".login_form button").on('click', function() {
        login();
    });
    document.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            login();
        }
    }, false);
});
*/

function testLog(data)
{
   alert("log "+ data); 
}


$(document).ready( function() {

    $(".myself_form button#btn_submit").on('click',function(){
        var ip_input = $('#input_ip').val();
        testLog(ip_input);
        
        var newGateways = {};
        newGateways["name"] = " ";
        newGateways["description"] = " ";
        newGateways["address"] = $("#input_ip").val();
        
        $.ajax({
            url:'/api/v1/auth/login',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(newGateways),
            success:function(data){
               testLog(data); 
            }
        });
    });
    
    
    $(".myself_form button#btn_get").on('click',function(){
        var ip_input = $('#input_ip').val();
	var datavalue = {};
	datavalue["hostIP"] =ip_input;
        testLog("btn_get  press down!!!!"); 
        $.ajax({
            url:'/api/v1/auth/addGateway',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(datavalue),
            success:function(data){
                testLog("auth/addGateway  successful"); 
            }
        });
    
    });
    
    $(".myself_form button#btn_post").on('click',function(){
        var ip_input = $('#input_ip').val();
        testLog("btn_post  press down!!!!"); 
        $.ajax({
            url:'/api/v1/auth/proxy',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify({
                'hostIP':ip_input
            }),
            success:function(data){
                testLog("auth/proxy  successful"); 
            }
        });
    /*        
            testLog("proxy successful!!!");
                $.ajax({
                    url:'/core-metadata/api/v1/deviceservice',
                    type:'GET',
                    success:function(data){}
   */
       
        
    });
    
/*
    $(".myself_form button#btn_submit").on('click', function() {
        
       var ip_input = $("#input_ip").val();
        
       alert("message btn_submit" + ip_input);
        var param = {"serverip":ip_input};      
        $.ajax({
            url: '/api/v1/auth/login',
            type: 'POST',
            contentType: 'application/json',
//            data: JSON.stringify({
//               'serverip': ip_input
//            })，
            data:JSON.stringify(param),
            success: function(data) {
               alert("successful " + data); 
               
            }
        });
    });
    
*/  
    
/*
    $(".div_restful button").on('click', function() {
        alert("message  div_restful");
    }); 
    
    $("#btn_put").on('click',function(){
        alert("message btn_put");
    });
*/
});








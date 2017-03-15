/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function errorHandler(e){
  console.log(e);
}

function gotContacts(contacts){
  var list = $("#contact-list").append('<ul class="list-group" ></ul>').find('ul');
  $.each(contacts,function(index,value){
    if(value.displayName && value.phoneNumbers){
      if(value.photos){
        list.append('<li  class="list-group-item list-group-item-success" >' + '<img src="' +value.photos[0].value  + '"> ' + value.displayName+' - ' + value.phoneNumbers[0].value +'</li> ');

      }else{
        list.append('<li  class="list-group-item  list-group-item-success" >'+value.displayName + '- ' + value.phoneNumbers[0].value + '</li>' );
      }
    }
  });
}

var app = {
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function(){
    document.addEventListener('deviceready',this.onDeviceReady,false);
  },
  onDeviceReady:function(){
    navigator.contacts.find([navigator.contacts.fieldType.displayName],gotContacts,errorHandler);

  },
};

app.initialize();

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

package controller

import (
	"log"
	"net/http"
	"encoding/json"
	"github.com/edgexfoundry/edgex-ui-go/configs"
	"github.com/edgexfoundry/edgex-ui-go/web/app/common"
	"github.com/edgexfoundry/edgex-ui-go/web/app/domain"
	"github.com/edgexfoundry/edgex-ui-go/web/app/repository"
)

const (
	UserNameKey = "name"
	PasswordKey = "password"
    HostIPKey = "hostIP"
    
)

/*
func Login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	name := m[UserNameKey]
	pwd := m[PasswordKey]

	u := domain.User{Name: name, Password: pwd}
	ok, err := repository.GetUserRepos().ExistsUser(u)

	if err != nil {
		log.Println("User: " + name + " login failed : " + err.Error())
		w.Write([]byte("log failed : " + err.Error()))
		return
	}

	if ok {
		token := common.GetMd5String(name)
		common.TokenCache[token] = u
		log.Println("User: " + name + " login.")
		w.Write([]byte(token))
	}
}
*/

func Login(w http.ResponseWriter, r *http.Request) {
    
    m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
    
	name := m[UserNameKey]
	pwd := m[PasswordKey]

	u := domain.User{Name: name, Password: pwd}
	ok, err := repository.GetUserRepos().ExistsUser(u)

	if err != nil {
        log.Println("User: " + name + " login failed : " + err.Error())
		w.Write([]byte("log failed : " + err.Error()))
        log.Println("error !!!")
//		return
	}
    
	if ok {
        log.Println("ok err !!!")
    }
    
	token := common.GetMd5String(name)
	common.TokenCache[token] = u
	log.Println("User: " + name + " login.")
	w.Write([]byte(token))
	
    
    log.Println("controller auth.go  94")

}


func AddGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var g domain.Gateway
	err := json.NewDecoder(r.Body).Decode(&g)
    	log.Println("auth.go  AddGateway line 102")
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	repository.GetGatewayRepos().Insert(&g)
    log.Println("auth.go  AddGateway  insert successsful！！！！")
}


func ProxyConfigGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
    log.Println("hello ProxyConfigGateway!!!!");
	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	targetIP := m[HostIPKey]
	common.DynamicalProxyCache[r.Header.Get(configs.SessionTokenKey)] = targetIP
}



func Logout(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get(configs.SessionTokenKey)
	delete(common.TokenCache, token)
}

package appbuilder

import com.User

class AppBuilderController {
    def appService ;
    def index() { }
    def createApp(){
       def user = session['user']  as User ;
        user.project = appService.createNewApp()
    }
}

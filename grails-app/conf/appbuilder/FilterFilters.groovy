package appbuilder

import com.User

class FilterFilters {

    def filters = {
        all(controller:'*', action:'*') {
            before = {
                if( !session['user']){
                     session['user'] = new User(name: 'dummyUser');
                }
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}

package com

class Project {

    String name
    User user

    static constraints = {
        name blank: false,size: 1..50
        user()
    }

    static  hasMany = [projectElements:ProjectElement];
}

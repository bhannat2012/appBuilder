package com



class ProjectElement {
    ProjectElementType elementType
    String packageName
    static constraints = {
    }
    static hasMany = [projectFiles:ProjectFile,projectElements:ProjectElement];
    static belongsTo = [project:Project]

    def ProjectElement createFolder( ProjectElementType elementType , String packageName)  {
              this.addToProjectElements( [elementType :elementType ,packageName:packageName])    ;
        this;
    }

    def ProjectElement createFile(ProjectElementType elementType, String packageName ,String fileName)  {
        this.addToProjectFiles( [elementType :elementType ,packageName:packageName,name: fileName])    ;
        this;
    }

}

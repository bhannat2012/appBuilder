package com

class ProjectFile {
    String name, packageName
    ProjectElementType elementType
    static constraints = {
        packageName blank: false, size: 1..50
        name blank: false, size: 1..50
    }
    static belongsTo = [projectElement: ProjectElement]
}

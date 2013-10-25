package appbuilder

import grails.converters.JSON

class DummyController {

    def index() {}

    def getProject() {
        def projectStructure = [
                [name: 'src', elementType: 'folder', elements: [
                        [name: 'main', elementType: 'folder', elements: [
                                [name: 'java', elementType: 'folder', elements: [
                                        [name: 'Main.java', elementType: 'file', data: """
                                                    package com.company
                                                    // Imports
                                                    import java.utils.*

                                                   public class Main{
                                                           public static void main(String[] args) {
                                                                system.out.println(" Welc come to AppBilder" );
                                                           }
                                                   }
                                                   """
                                        ]
                                ]
                                ],
                                [name: 'groovy', elementType: 'folder', elements: [
                                        [name: 'Main.java', elementType: 'file', data: """
                                                    package com.company
                                                    // Imports
                                                    import java.utils.*

                                                   public class Main{
                                                           public static void main(String[] args) {
                                                                system.out.println(" Welc come to AppBilder" );
                                                           }
                                                   }
                                                   """
                                        ]
                                ]
                                ]
                        ]
                        ],
                        [name: 'test', elementType: 'folder', elements: [
                                [name: 'java', elementType: 'folder', elements: [
                                        [name: 'mainTest', elementType: 'file', data: " simple Java test"],
                                    ]
                                ],
                                [name: 'groovy', elementType: 'folder', elements: [
                                        [name: 'HelperTest', elementType: 'file', data: " simple Groovy test"],
                                    ]
                                ]
                            ]
                        ]
                ]
                ] ,
                [name: 'build.gradle', elementType: 'file', data: " simple gradle build file"]
        ]

        render projectStructure as JSON;
    }
}

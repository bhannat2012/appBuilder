import com.AppSettings
import com.Project
import com.ProjectElement
import com.ProjectElementType

/**
 * Created with IntelliJ IDEA.
 * User: Algo
 * Date: 10/25/13
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
class AppService {
    def servletContext;

    Project createNewApp() {
        def appSettings = servletContext["appSetting"] as AppSettings;
        def project = new Project();
        project.name = "Project-${appSettings.projectCounts ? appSettings.projectCounts + 1 : 1}"
        def sourceFolder = new ProjectElement(elementType: ProjectElementType.SourceFolder);
        def sourceMain = sourceFolder.createFolder(ProjectElementType.SourceMain)
        sourceMain.createFolder(ProjectElementType.JavaFolder)
        sourceMain.createFolder(ProjectElementType.GroovyFolder)
        project.projectElements.add(sourceFolder)
        return project
    }
}

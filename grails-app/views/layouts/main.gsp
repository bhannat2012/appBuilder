<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="App Builder1"/></title>
		%{--<meta name="viewport" content="width=device-width, initial-scale=1.0">--}%
		%{--<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">--}%
		%{--<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">--}%
		%{--<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">--}%

		%{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">--}%
		%{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">--}%
        <script type="text/javascript" src="${resource(dir: 'vendor/JQuery/2.0.3', file: 'jquery-2.0.3.js')}" ></script>

    <!--[if lt IE 9]>
      <script type="text/javascript" src="${resource(dir: 'js', file: 'html5shiv.js')}"></script>
      <script src="${resource(dir: 'js', file: 'respond.min.js')}"></script>
    <![endif]-->
    <link rel="stylesheet" href="${resource(dir: 'vendor/bootstrap/3.0.0/dist/css', file: 'bootstrap.min.css')}" type="text/css">
		<link rel="stylesheet" href="${resource(dir: 'vendor/bootstrap/3.0.0/dist/css', file: 'bootstrap-theme.min.css')}" type="text/css">
        <script type="text/javascript" src="${resource(dir: 'vendor/bootstrap/3.0.0/dist/js', file: 'bootstrap.min.js')}" ></script>

        <link rel="stylesheet" href="${resource(dir: 'vendor/alloyUi/2.0.0pr7/aui-css/css', file: 'bootstrap.min.css')}" type="text/css">
        <script type="text/javascript" src="${resource(dir: 'vendor/alloyUi/2.0.0pr7/aui', file: 'aui-debug.js')}" ></script>

		%{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css">--}%
		<g:layoutHead/>
		<r:layoutResources />
	</head>
	<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">App Builder</a>
            </div>
            <div class="navbar-collapse collapse">

                <ul class="nav navbar-nav pull-right">
                    <li class="dropdown pull-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Builder<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Create App</a></li>
                            <li><a href="#">Save</a></li>
                            <li><a href="#">Save All</a></li>
                            <li class="divider"> </li>
                            <li><a href="#">Build Dependencies</a></li>
                            <li><a href="#">Compile</a></li>
                            <li><a href="#">Make War</a></li>
                            <li class="divider"> </li>

                            <li><a href="#">Deploy</a></li>
                            %{--<li><a href="#">One more separated link</a></li>--}%
                            <li class="dropdown-header">Download</li>
                        </ul>
                    </li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>

		<g:layoutBody/>
		<r:layoutResources />
	</body>
</html>

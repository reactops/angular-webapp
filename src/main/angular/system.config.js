(function() {

    // Alias the path to the common rc1 vendor scripts.
    var paths = {
        "vendor/*": "/assets/vendor/*"
    };

    // Tell Angular how normalize path and package aliases.
    var map = {
	"app": "./",
        "@angular": "vendor/angular2",
        "angular2-in-memory-web-api": "vendor/angular2-in-memory-web-api",
        "rxjs": "vendor/rxjs",
        "ts": "vendor/plugin-typescript/lib/plugin.js",
        "tsconfig.json": "config/tsconfig.json",
	"json": "vendor/systemjs-plugin-json/json.js",
	"css": "vendor/systemjs-plugin-css/css.js",
	"img": "vendor/system-image/image.js",
	"jquery": "vendor/jquery/dist/jquery.min.js",
	"jvectormap": "vendor/jvectormap/jquery-jvectormap.min.js",
	"jquery-ui": "vendor/jquery-ui/build/release.js", 
	"jquery-sparkline": "vendor/jquery-sparkline/jquery.sparkline.min.js",
	"jquery-slimscroll": "vendor/jquery-slimscroll/jquery.slimscroll.min.js",
	"jquery-knob": "vendor/jquery-knob/dist/jquery.knob.min.js",
//	"webfont": "vendor/webfont/dist/index.js",
//	"font": "vendor/system-font/font.js",
	"bootstrap": "vendor/admin-lte/bootstrap/js/bootstrap.min.js",
	"adminlte": "vendor/admin-lte/dist/js/app.min.js", 
        "typescript": "vendor/typescript/lib/typescript.js"
    };

    // Setup meta data for individual areas of the application.
    var packages = {
        "app": {
            main: "main.bundle.js",
            defaultExtension: "js"
        },
        "@angular": {
            defaultExtension: "js"
        },
//	"angular2-in-memory-web-api": { defaultExtension: "js" },
//	"rxjs": { defaultExtension: "js" },
	"ts": { defaultExtension: "js" },
	"tsconfig.json": { defaultExtension: "js" },
	"css": { defaultExtension: "css", loader: 'css' },
	"png": { defaultExtension: "png", loader: 'img' },
	"jpg": { defaultExtension: "jpg", loader: 'img' }
//	"woff": { defaultExtension: "woff", loader: 'font' },
//        "woff2": { defaultExtension: "woff2", loader: 'font' },
//        "ttf": { defaultExtension: "ttf", loader: 'font' }
//	"adminlte": { defaultExtension: "js" },
//	"bootstrap": { defaultExtension: "js" },
//	"typescript": { defaultExtension: "js" }
    };

    var ngPackageNames = [
        "common",
        "compiler",
        "core",
        "http",
        "platform-browser",
        "platform-browser-dynamic",
        "router",
        "router-deprecated",
        "upgrade"
    ];

    ngPackageNames.forEach(
        function iterator( packageName ) {

            packages[ "@angular/" + packageName ] = {
                main: ( packageName + ".umd.js" )
                  ,
                  defaultExtension: "js"
            };

        }
    );

    System.config({
        paths: paths,
        map: map,
        packages: packages,
        transpiler: "ts",
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
            typescript: {
                exports: "ts"
            }
        }
    });

    // Load "./app/main.ts" (gets full path from package configuration above).
    System.import ("json")
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped json." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the json." );
                console.error( error );
            }
        )
    ;
    System.import ("css")
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped css." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the css." );
                console.error( error );
            }
        )
    ;
    System.import ("img")
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped img." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the img." );
                console.error( error );
            }
        )
    ;
//    System.import ("font")
//        .then(
//            function handleResolve() {
//                console.info( "System.js successfully bootstrapped font." );
//            },
//            function handleReject( error ) {
//                console.warn( "System.js could not bootstrap the font." );
//                console.error( error );
//            }
//        )
//    ;
    System.import ("jquery")
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped jquery." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the jquery." );
                console.error( error );
            }
        )
    ;
    System.import ("bootstrap")
	.then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped bootstrap." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the bootstrap." );
                console.error( error );
            }
        )
    ;
    System.import ("adminlte")
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped adminlte." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the adminlte." );
                console.error( error );
            }
        )
    ;
})();

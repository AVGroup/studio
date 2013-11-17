<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- pojects -->
    <link href="/templates/bannerscollection_zoominout.css" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <style type="text/css">
        html, body {
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        }
    </style>    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
    <script src="/templates/js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
    <script src="/templates/js/bannerscollection_zoominout.js" type="text/javascript"></script>
    	<script>
		jQuery(function() {
			jQuery('#bannerscollection_zoominout_majestic').bannerscollection_zoominout({
				skin: 'majestic',
				responsive:true,
				width: 1920,
				height: 1200,
				width100Proc:true,
				height100Proc:true,
				showNavArrows:true,
				showBottomNav:true,
				autoHideBottomNav:true,
				thumbsOnMarginTop:18,
				thumbsWrapperMarginTop: -135,
				pauseOnMouseOver:false
			});		
			
		});

		
	</script>
    <!-- end pojects -->
    <!-- home -->
	<link rel="stylesheet" href="templates/style.css" type="text/css"/> 
    <link href="templates/assets/css/bootstrapTheme.css" rel="stylesheet" type="text/css">
    <link href="templates/assets/css/custom.css" rel="stylesheet" type="text/css">
    <link href="templates/owl-carousel/owl.carousel.css" rel="stylesheet" type="text/css">
    <link href="templates/owl-carousel/owl.theme.css" rel="stylesheet" type="text/css">
    <!-- end home -->
  </head>
  <body style="background-color:#c24146;"> 
      <?php echo $content ?>
  </body>
</html>

<?php ob_start(); ?>
<span style="position:absolute; font-size:30px; color: #f1f1f2;margin-left:9.5%; margin-top:6%;">cтудия дизайна</span>
<img src="templates/image/logo.png" style='width:700px;position:absolute; margin-left:8%; margin-top:2%;'>

<div id="owl-demo" class="owl-carousel">
    <?php
	$i = 0;
	foreach ($projects as $project):
	$i++;
	?>
    <a href="/index.php/projects?id=<?php echo $project['id'] ?>"> <div class="item">
	<img class="project<?php echo $i;?>" src="<?php echo $project['photo']; ?>"/>
	<span id="nameid"class="name<?php echo $i;?>"><?php echo $project['name']; ?></span>
	</div></a>
    <?php endforeach; ?>
</div>
    <script src="templates/assets/js/jquery-1.9.1.min.js"></script> 
    <script src="templates/owl-carousel/owl.carousel.js"></script>
    <script>
        $(document).ready(function() {
        $("#owl-demo").owlCarousel({
        navigation : true
        });
        });
    </script>
<?php $content = ob_get_clean() ?>
<?php include 'templates/layout.php' ?>
<?php ob_start(); ?>
<div id="bannerscollection_zoominout_majestic">
            	<div class="myloader"></div>
                <!-- CONTENT -->
                <ul class="bannerscollection_zoominout_list">
                    <?php foreach ($project as $pro): ?>
               	    <li data-text-id="#bannerscollection_zoominout_photoText1" data-bottom-thumb=<?php echo $pro['photo'];?> data-horizontalPosition="center" data-verticalPosition="center" data-initialZoom="0.78" data-finalZoom="1" ><img src=<?php echo $pro['photo'];?> alt="" width="2500" height="1570" /></li>
                    <?php endforeach; ?>
                </ul>        
</div>
<?php $content = ob_get_clean() ?>
<?php include 'templates/layout.php' ?>
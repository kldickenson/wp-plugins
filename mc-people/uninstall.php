<?php

/**
 * Trigger this file on Plugin uninstall
 *
 * @package PeoplePlugin
 */


 if( ! defined('WP_UNINSTALL_PLUGIN') ) {
      die;
 }

// Clear DB stored data
$people = get_posts( array(
   'post_type' => 'people',
   'numberposts' => -1
) );

foreach ( $people as $person ) {
   wp_delete_post ($person->ID, true );
}

// Access the db via SQL - more risky but cleans up more
// global $wpdb;
// $wpdb->query( "DELETE FROM wp_posts WHERE post_type = 'people'" );
// $wpdb->query( "DELETE FROM wp_postmeta WHERE post_id NOT IN (SELECT id FROM wp_posts)" )
// $wpdb->query( "DELETE FROM wp_term_relationship WHERE object_id NOT IN (SELECT id FROM wp_posts)" )

?>
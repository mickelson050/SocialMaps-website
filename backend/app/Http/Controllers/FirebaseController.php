<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
class FirebaseController extends Controller
{
	public function index(){
		$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/socialmaps-19e9e-firebase-adminsdk-burwv-484d214daf.json');
		$firebase 		  = (new Factory)
		->withServiceAccount($serviceAccount)
		->withDatabaseUri('https://socialmaps-19e9e.firebaseio.com')
		->create();
		$database 		= $firebase->getDatabase();

		//return()

		$test = $database -> getReference('gebruikers/01')->push(['username' => 'user', 'password' => 'pass']);
		// $newPost 		  = $database
		// ->getReference('blog/posts')
		// ->push(['title' => 'Post title','body' => 'This should probably be longer.']);
		echo"<pre>";
		print_r($test->getvalue());
	}
}
?>
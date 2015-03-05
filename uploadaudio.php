<?

// Returning JSON
header('Content-Type: application/json');



class UploadException extends Exception 
{ 
    public function __construct($code) { 
        $message = $this->codeToMessage($code); 
        parent::__construct($message, $code); 
    } 

    private function codeToMessage($code) 
    { 
        switch ($code) { 
            case UPLOAD_ERR_INI_SIZE: 
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini"; 
                break; 
            case UPLOAD_ERR_FORM_SIZE: 
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break; 
            case UPLOAD_ERR_PARTIAL: 
                $message = "The uploaded file was only partially uploaded"; 
                break; 
            case UPLOAD_ERR_NO_FILE: 
                $message = "No file was uploaded"; 
                break; 
            case UPLOAD_ERR_NO_TMP_DIR: 
                $message = "Missing a temporary folder"; 
                break; 
            case UPLOAD_ERR_CANT_WRITE: 
                $message = "Failed to write file to disk"; 
                break; 
            case UPLOAD_ERR_EXTENSION: 
                $message = "File upload stopped by extension"; 
                break; 

            default: 
                $message = "Unknown upload error"; 
                break; 
        } 
        return $message; 
    } 
} 



// http://www.ultramegatech.com/2010/10/create-an-upload-progress-bar-with-php-and-jquery/
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
	$filename = $_POST['filename'];
	$username = $_POST['username'];
	$filename = preg_replace('/[\s]/', '_', $filename); // replace spaces with _
	$filename = preg_replace('/[^A-Za-z0-9_]/', '', $filename); //remove non-alphanumeric or _
    $filename = str_pad(strval($vid),2,"0",STR_PAD_LEFT) . '-' . $filename;
    $path = './assets/audio/uploaded/'. $username . '//' . $filename;
    move_uploaded_file($_FILES['file']['tmp_name'], $path);
    // call back
    die(json_encode(array(
    	"status" => "OK",
    	"path" => $path,
    	"fileerrorresp" => $_FILES['file']['error'],
    	"post" => $_POST['filename'])));
}else{
	// error call back
	echo "error";
	throw new UploadException($_FILES['file']['error']); 
}

/*
// http://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob


// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
echo data
// decode it
$decodedData = base64_decode($data);
// print out the raw data, 
echo ($decodedData);
$filename = "test.txt";
// write the data out to the file
$fp = fopen($filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);*/
?>
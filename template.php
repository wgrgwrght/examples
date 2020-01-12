<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="template.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>techdefs template</title>
</head>
<body>
    <nav id="menu" aria-label="main menu">
        
            <ul class="main-menu">
                <li ><a href="option1.html" >Search </a>
                </li>
                <li ><a href="option2.html" >Add Term </a>
                </li>
                <li ><a href="option3.html" >Edit or Delete Term </a>
                </li>
            </ul>
        
    </nav>
    
    <main class="main-content">
        <div class="column-box">
            <section class="main-content-item">
                <h2>Search</h2>
                    <form method="post">
                        <input type="text" name="term" placeholder="Term" minlength="1">
                        <p><label>Submit: </label><input type="submit" name="submitss" value="Search"></p>
                        <input type ="hidden" name = "action" value = "Search" >
                    </form>
                <div>
                    <?php                        
                        if (isset($_POST['term']))
                            {       
                            define('ISITSAFETORUN', TRUE);
                            error_reporting(E_ALL);
                            ini_set('display_errors', 1);
                            $databasename ='techdefs.sqlite';
                            require 'opendatabase.php';
                            require 'sformdata.php';
                            $sql='select term , definition from mydefinitions where term like :term'; 
                            $stmt = $db->prepare( $sql); 
                            $stmt->bindValue(":term" , '%'.$webdata['term'].'%' , SQLITE3_TEXT); 
                            $result = $stmt->execute(); 
                            while ($row = $result->fetchArray()){ 
                                echo '<p>' . htmlspecialchars($row['term'])  . " : " . htmlspecialchars($row['definition']).'</p>';
                            }
                        }
                    ?>
                </div>
            </section>
            <section class="main-content-item">
                <h2>Add Term</h2>
                    <form method="post">
                        <p><input type="text" name="Term" placeholder="Term" minlength="1"></p>
                        <p><input type="text" name="Definition" placeholder="Definition" required minlength="1"></p>
                        <p><label>Submit: </label><input type="submit" name="submitss" value="Add Term"></p>
                    <input type ="hidden" name = "action" value = "addterm" >
                    </form>
            </section>
            <section class="main-content-item">
                <h2>Edit or Delete Term</h2>
                    <form>
                        <p><input type="text" name="Term" placeholder="Term" required minlength="1"></p>
                        <p><label>Submit: </label><input type="submit" name="submitss" value="Edit">
                        <input type ="hidden" name = "action" value = "editterm" >
                        <input type="submit" name="submitss"  value="Delete">
                        <input type ="hidden" name = "action" value = "deleteterm" ></p>
                    </form>
            </section>
        </div>
    </main>
</body>
</html>

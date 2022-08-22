<?php
echo $_SERVER['DOCUMENT_ROOT'];
list($dollar, $euro)=load_kurs();
echo '<br><br>';
echo date('d.m.Y H:i',filemtime($_SERVER['DOCUMENT_ROOT'].'/demo/kurs.txt'));

function load_kurs()
{
define("tsKurs","15:00:00");        # Время смены курса центральным банком
$kurs_file= $_SERVER['DOCUMENT_ROOT'].'/demo/kurs.txt';
if (file_exists($kurs_file)){
   $lastModified=filemtime($kurs_file);
   // каждые 24 часа, но с учетом времени смены курса центральным банком
   if (date("Y-m-d H:i:s",$lastModified) > date("Y-m-d H:i:s",time()-60*60*24) && !(date("H:i:s",$lastModified) < tsKurs && date("H:i:s")>tsKurs ) ) {
    return explode('|',file_get_contents($kurs_file));
    //echo "<!--Курс ЦБ на ".date("Y-m-d H:i:s",$lastModified)."<br>Доллар - <b>".$dollar."</b><br>Евро - <b>".$euro."</b><br>".$df1."-->";
    }
}

// Получаем текущие курсы валют в rss-формате с сайта www.cbr.ru
$content = get_content();

if(!$content&&file_exists($kurs_file)){// считаю по старому курсу если он есть
    return explode('|',file_get_contents($kurs_file));
}

  // Разбираем содержимое, при помощи регулярных выражений
  $pattern = "#<Valute ID=\"([^\"]+)[^>]+>[^>]+>([^<]+)[^>]+>[^>]+>[^>]+>[^>]+>[^>]+>[^>]+>([^<]+)[^>]+>[^>]+>([^<]+)#i";
  preg_match_all($pattern, $content, $out1, PREG_SET_ORDER);
  $dollar = "";
  $euro = "";
  foreach($out1 as $cur1)
  {
    if($cur1[2] == 840) $dollar = str_replace(",",".",$cur1[4]);
    if($cur1[2] == 978) $euro   = str_replace(",",".",$cur1[4]);
  }

  if(file_put_contents($kurs_file, $kurs=($dollar.'|'.$euro))<7)die('Ошибка записи в '.$kurs_file);
  return explode('|',$kurs);
}

function get_content()
{
    // Формируем сегодняшнюю дату
    $date = date("d/m/Y");
    // Формируем ссылку
    $link = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=".$date;
    // Загружаем HTML-страницу
    $fd = @fopen($link, "r");
    $text="";
    if (!$fd) echo "<h3>Сервер ЦБ не отвечает!</h3>";
    else
    {
      // Чтение содержимого файла в переменную $text
      while (!feof ($fd)) $text .= @fgets($fd, 4096);
      // Закрыть открытый файловый дескриптор
      @fclose ($fd);
    }
    return $text;
}

$dollar2 = $dollar * (14/ 100) + $dollar;
$euro2 = $euro * (14/ 100) + $euro;
?>


<!-- Курс ЦБ РФ на <?php echo date('d.m.Y H:i',filemtime($_SERVER['DOCUMENT_ROOT'] .'/demo/kurs.txt')); ?> -->
<p class="uk-margin-remove">
  <span class="tl-fw500 tl-txt-color1 t-fs13">Курс VerSa Travel - <span id="daterate"
      class="uk-text-muted tl-fw500 t-fs13"><?php echo date( 'd.m.Y' ); ?></span></span>
  <br>
  <span id="USD2" class="usd tl-fw400 t-txt-color4 uk-margin-small-right"><?php echo round($dollar2, 2); ?></span>
  <span id="EUR2" class="euro tl-fw400 t-txt-color4"><?php echo round($euro2, 2); ?></span>
</p>

<p id="t-cur-rf" class="uk-margin-remove">
  <span class="tl-fw500 tl-txt-color1 t-fs13">Курс валют ЦБ РФ - <span id="daterate2"
      class="uk-text-muted tl-fw500 t-fs13"><?php echo date( 'd.m.Y' ); ?></span></span>
  <br>
  <span id="USD" class="usd tl-fw400 t-txt-color4 uk-margin-small-right"><?php echo round($dollar, 2); ?></span>
  <span id="EUR" class="euro tl-fw400 t-txt-color4"><?php echo round($euro, 2); ?></span>
</p>

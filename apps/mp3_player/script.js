const playlistSelect = document.getElementById('playlist');
const songList = document.getElementById('songList');
const audio = document.getElementById('audio');
const nowPlaying = document.getElementById('nowPlaying');
const shuffleBtn = document.getElementById('shuffleBtn');

const playlists = ['rap1', 'country1'];

const songs = {
  'country1': ['Watching You.mp3', "All My Ex's Live In Texas.mp3", "She Thinks My Tractor's Sexy.mp3", 'Honey Bee.mp3', 'Your Man.mp3', 'Amarillo By Morning.mp3', 'Dixieland Delight.mp3', 'Mountain Music.mp3', 'Song of the South.mp3', 'Pickup Man.mp3', 'I Like It, I Love It.mp3', "Fishin' in the Dark.mp3", "Farmer's Daughter.mp3", 'Good Time.mp3', 'Paint Me A Birmingham.mp3', 'Neon Moon.mp3', 'Forever and Ever, Amen.mp3', "Drinkin' Problem.mp3", 'Burn Out.mp3', 'Check Yes Or No.mp3', 'Write This Down.mp3', 'Dust On The Bottle.mp3', 'Big Green Tractor.mp3', 'Boondocks.mp3', "What Was I Thinkin'.mp3", "That's What I Love About Sunday.mp3", "Must Be Doin' Somethin' Right.mp3", 'Live Like You Were Dying.mp3', 'A Country Boy Can Survive.mp3', 'The Fireman.mp3', 'When My Ship Comes In.mp3', 'Meet Me In Montana.mp3', 'Straight Tequila Night.mp3', 'Ocean Front Property.mp3', 'John Deere Green.mp3', "Ol' Red.mp3", "She's Country.mp3", 'Family Tradition.mp3', "Thank God I'm a Country Boy.mp3", 'Bubba Shot The Jukebox.mp3', 'Two Dozen Roses.mp3', 'Meet In the Middle.mp3', "Don't Rock the Jukebox.mp3", "If You're Gonna Play in Texas (You Gotta Have a Fiddle in the Band).mp3", 'Good Directions.mp3', 'Carrying Your Love With Me.mp3', 'As Good As I Once Was.mp3', 'Whiskey Bent And Hell Bound.mp3', 'All My Rowdy Friends Are Coming Over Tonight.mp3', "If Heaven Ain't A Lot Like Dixie.mp3", 'Fightin Side Of Me.mp3', 'Every Little Honky Tonk Bar.mp3', 'Blue Clear Sky.mp3', 'Troubadour.mp3', 'Here For A Good Time.mp3', 'How Do You Like Me Now?!.mp3', 'Sold (The Grundy County Auction Incident).mp3', "Memory I Don't Mess With.mp3", 'Tequila Makes Her Clothes Fall Off.mp3', 'Give It Away.mp3', 'Some Girls Do.mp3', 'Redneck Yacht Club.mp3', 'I Can Still Make Cheyenne.mp3', 'I Saw God Today.mp3', 'Margaritaville (with Jimmy Buffett).mp3', 'Springsteen.mp3', 'Get Along.mp3', 'One Man Band.mp3', 'When It Rains It Pours.mp3', 'Whiskey Glasses.mp3', 'Your Heart Or Mine.mp3', 'Beer For My Horses.mp3', 'Head Over Boots.mp3', 'Every Storm (Runs Out Of Rain).mp3', 'Beautiful Crazy.mp3', 'If I Know Me.mp3'],
};

// Initialize playlist dropdown
playlists.forEach(pl => {
  const opt = document.createElement('option');
  opt.value = pl;
  opt.textContent = pl;
  playlistSelect.appendChild(opt);
});

// Load songs on playlist selection
playlistSelect.addEventListener('change', () => {
  const selected = playlistSelect.value;
  songList.innerHTML = '';
  songs[selected].forEach(song => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = song;
    cell.onclick = () => {
      audio.src = `music/${selected}/${song}`;
      audio.play();
      nowPlaying.textContent = `Now playing: ${song}`;
    };
    row.appendChild(cell);
    songList.appendChild(row);
  });
});

// Shuffle button logic
shuffleBtn.addEventListener('click', shufflePlay);

function shufflePlay() {
  const playlist = playlistSelect.value;
  if (!playlist || !songs[playlist] || songs[playlist].length === 0) return;

  const shuffled = [...songs[playlist]];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  let index = 0;

  function playNext() {
    if (index < shuffled.length) {
      const song = shuffled[index++];
      audio.src = `music/${playlist}/${song}`;
      audio.play();
      nowPlaying.textContent = `Now playing (shuffled): ${song}`;
    }
  }

  audio.onended = playNext;
  playNext();
}

// Initialize default
playlistSelect.dispatchEvent(new Event('change'));

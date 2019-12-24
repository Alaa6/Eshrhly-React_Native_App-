import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const click = new Sound('click.mp3', Sound.MAIN_BUNDLE);
const happy = new Sound('happy.mp3', Sound.MAIN_BUNDLE);
const sad = new Sound('sad.mp3', Sound.MAIN_BUNDLE);
const pop = new Sound('facebook_pop.mp3?0', Sound.MAIN_BUNDLE);
const pop1 = new Sound('facebook_pop.mp3?1', Sound.MAIN_BUNDLE);
const pop2 = new Sound('facebook_pop.mp3?2', Sound.MAIN_BUNDLE);
const pop3 = new Sound('facebook_pop.mp3?3', Sound.MAIN_BUNDLE);
const pop4 = new Sound('facebook_pop.mp3?4', Sound.MAIN_BUNDLE);

class SoundEffect {

    static pse(name) {
        if (name === 'stop') {
            click.stop();
            happy.stop();
            sad.stop();
            pop.stop();
            pop1.stop();
            pop2.stop();
            pop3.stop();
            pop4.stop();
        }
        if (name === 'click') {
            click.play();
        }
        if (name === 'happy') {
            happy.play();
        }
        if (name === 'sad') {
            sad.play();
        }
        if (name === 'facebook_pop0') {
            pop.play();
        }
        if (name === 'facebook_pop1') {
            pop1.play();
        }
        if (name === 'facebook_pop2') {
            pop2.play();
        }
        if (name === 'facebook_pop3') {
            pop3.play();
        }
        if (name === 'facebook_pop4') {
            pop4.play();
        }
    }

}

export default SoundEffect;
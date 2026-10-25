# Coral Studios website

Static site served by GitHub Pages from this repository. No build step.

| File | Purpose |
| --- | --- |
| `index.html` | Coral Code, and the studio's other apps |
| `privacy.html` | Privacy policy of Simple Prayer Times & Widget. Its URL is registered in Google Play Console: keep the path. |
| `open-source.html`, `open-source/licenses/` | Coral Code's third-party notices. Generated, do not edit by hand (see below). |
| `app-ads.txt` | AdMob authorized sellers. Must stay at the domain root, unchanged. |
| `robots.txt` | Crawler rules, including Mediapartners-Google. |
| `style.css`, `script.js` | One stylesheet and one small script for every page. |
| `assets/fonts/` | Inter and JetBrains Mono (SIL OFL 1.1, licenses alongside), subset to Latin. |

## Open-source notices for a Coral Code release

From the Coral Code repository (`coral_code_v2/`):

```sh
python3 tool/third_party_notices.py                   # refresh the app's notices
python3 tool/site_open_source.py PATH/TO/THIS/REPO    # regenerate open-source.html
python3 tool/third_party_sources.py /tmp/sources      # collect the source archive
tar -cf coral-code-VERSION-third-party-sources.tar -C /tmp/sources .
```

Publish the tar as an asset of a release tagged `coral-code-VERSION-sources`
in this repository; `open-source.html` links to that address.

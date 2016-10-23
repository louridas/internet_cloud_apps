SRC = $(shell find . -path ./reveal.js -maxdepth 2 -prune -o -name *.md -print)

HTML = $(SRC:%.md=%.html)

HTML_HANDOUTS = $(HTML:%.html=%-handouts.html)

all: $(HTML) $(HTML_HANDOUTS)

clean:
	rm $(HTML)
	rm $(HTML_HANDOUTS)

%.html: %.md
	pandoc -t revealjs -s $< --variable theme="louridas_aueb" -o $@ --self-contained

%-handouts.html: %.md
	pandoc -t html --toc -s $< -c css/pandoc.css -o $(basename $<)-handouts.html --self-contained

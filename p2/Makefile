FILES := p2.pdf
EXTS := %.pdf

all: $(FILES)

$(EXTS): %.pmd
	@pandoc -S -s $< -o $@ --number-sections --template ../acm-sig-template.latex
clean:
	@rm -rf $(FILES)

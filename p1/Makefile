FILES := p1.pdf
EXTS := %.pdf \
  %.tex

all: $(FILES)

$(EXTS): %.pmd
	@pandoc -S -s $< -o $@ --number-sections --template ../acm-sig-template.latex \
    --filter pandoc-citeproc

clean:
	@rm -rf $(FILES)

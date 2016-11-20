pdf := p2.pdf
incs := appendix.tex
src := p2.pmd

all: $(pdf)

%.tex: %.pmd
	@pandoc -S $< -o $@ -N

$(pdf): $(src) $(incs)
	@pandoc -S -s $(src) -o $(pdf) -N --template ../acm-sig-template.latex \
		--filter pandoc-citeproc --include-after-body $(incs)

clean:
	@rm -rf $(pdf) $(incs)

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker via CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ─── Page components MUST be defined outside the main component ───
// Defining them inside causes React hooks violations and a white-screen crash.

const PageCover = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    className={`page page-cover ${props.className || ''}`} 
    ref={ref} 
    data-density="hard" 
    style={{ ...props.style, overflow: 'hidden', background: 'white' }}
  >
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'white' }}>
      {props.children}
    </div>
  </div>
));
PageCover.displayName = 'PageCover';

const PageComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    className={`page ${props.className || ''}`} 
    ref={ref} 
    style={{ ...props.style, overflow: 'hidden', background: 'white' }}
  >
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'white' }}>
      {props.children}
    </div>
  </div>
));
PageComponent.displayName = 'PageComponent';

// ─── Error Boundary ───────────────────────────────────────────────
class ErrorBoundary extends React.Component<any, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
          <h2 style={{ color: '#f83821', marginBottom: 16 }}>Erro no Leitor de Revistas</h2>
          <pre style={{ color: '#ff6b6b', fontSize: 12, whiteSpace: 'pre-wrap' }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Safe Page Wrapper with Lifecycle Status Debugging ─────────────
const SafePage: React.FC<{
  pageNumber: number;
  width: number;
  height: number;
}> = ({ pageNumber, width, height }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <div style={{ width, height, position: 'relative', background: 'white' }}>
      {status === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', zIndex: 10 }}>
          <Loader2 style={{ width: 24, height: 24, color: '#f83821', animation: 'spin 1s linear infinite', marginBottom: 8 }} />
          <span style={{ fontSize: 12, color: '#666' }}>A carregar pág. {pageNumber}...</span>
        </div>
      )}
      {status === 'error' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#991b1b', padding: 12, zIndex: 10, textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 'bold' }}>Erro na Pág. {pageNumber}</span>
          <span style={{ fontSize: 10, marginTop: 4, wordBreak: 'break-word' }}>{errorMsg}</span>
        </div>
      )}
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        onLoadSuccess={() => {
          console.log(`Page ${pageNumber} loaded successfully`);
        }}
        onLoadError={(err) => {
          console.error(`Page ${pageNumber} load error:`, err);
          setStatus('error');
          setErrorMsg(err.message || String(err));
        }}
        onRenderSuccess={() => {
          console.log(`Page ${pageNumber} rendered successfully`);
          setStatus('success');
        }}
        onRenderError={(err) => {
          console.error(`Page ${pageNumber} render error:`, err);
          setStatus('error');
          setErrorMsg(err.message || String(err));
        }}
      />
    </div>
  );
};

// ─── Main Reader Component ────────────────────────────────────────
const MagazineReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [magazine, setMagazine] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState('1');
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(500);
  const [pageHeight, setPageHeight] = useState<number>(600);

  const flipBookRef = useRef<any>(null);

  // Sync manual flip changes to pageInput
  useEffect(() => {
    setPageInput(String(currentPage + 1));
  }, [currentPage]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const jumpToPage = (targetStr: string) => {
    const pageNum = parseInt(targetStr, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      const targetIndex = pageNum - 1;
      const pf = flipBookRef.current;
      if (pf) {
        if (pf.pageFlip) {
          typeof pf.pageFlip === 'function' ? pf.pageFlip().flip(targetIndex) : pf.pageFlip.flip(targetIndex);
        } else if (pf.getPageFlip) {
          pf.getPageFlip().flip(targetIndex);
        }
      }
    } else {
      setPageInput(String(currentPage + 1));
    }
  };

  const handlePageInputBlur = () => {
    jumpToPage(pageInput);
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      jumpToPage(pageInput);
      e.currentTarget.blur();
    }
  };

  // Calculate pages dimensions dynamically to fit viewport while preserving aspect ratio (A4)
  useEffect(() => {
    const calc = () => {
      const containerWidth = window.innerWidth - 64;
      const containerHeight = window.innerHeight - 200; // safe area for headers and footers
      const aspectRatio = 210 / 297; // A4 aspect ratio (width / height)
      const bookAspectRatio = 2 * aspectRatio;

      let bookWidth, bookHeight;
      if (containerWidth / containerHeight > bookAspectRatio) {
        // height is the constraint
        bookHeight = containerHeight;
        bookWidth = bookHeight * bookAspectRatio;
      } else {
        // width is the constraint
        bookWidth = containerWidth;
        bookHeight = bookWidth / bookAspectRatio;
      }

      setPageWidth(Math.floor(bookWidth / 2));
      setPageHeight(Math.floor(bookHeight));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Fetch magazine data
  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine/${id}`);
        if (!res.ok) {
          const body = await res.text();
          setError(`HTTP ${res.status}: ${body}`);
          return;
        }
        const data = await res.json();
        setMagazine(data);
      } catch (err: any) {
        setError(`Falha de rede: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMagazine();
  }, [id]);

  // Set PDF file URL (supports direct URL/HTTP or Base64 fallback transparently)
  useEffect(() => {
    if (!magazine?.pdfFileUrl) return;

    const isUrl = magazine.pdfFileUrl.startsWith('http://') || 
                  magazine.pdfFileUrl.startsWith('https://') || 
                  magazine.pdfFileUrl.startsWith('/');

    if (isUrl) {
      setPdfFile(magazine.pdfFileUrl);
      return;
    }

    try {
      const base64Data = magazine.pdfFileUrl.includes(',')
        ? magazine.pdfFileUrl.split(',')[1]
        : magazine.pdfFileUrl;

      if (!base64Data) {
        setError('Ficheiro PDF inválido.');
        return;
      }

      const binaryString = window.atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfFile(url);

      return () => URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to parse PDF:', e);
      setError('Erro ao processar o ficheiro PDF.');
    }
  }, [magazine]);

  // Build flipbook pages (memoized — only rebuilds if numPages or dimensions change)
  const flipBookPages = useMemo(() => {
    if (numPages <= 0 || pageWidth <= 0 || pageHeight <= 0) return null;
    return Array.from({ length: numPages }, (_, index) => {
      const isCover = index === 0;
      const isBackCover = index === numPages - 1;
      const Component = isCover || isBackCover ? PageCover : PageComponent;
      return (
        <Component key={`page_${index + 1}`} number={index + 1}>
          <SafePage
            pageNumber={index + 1}
            width={pageWidth}
            height={pageHeight}
          />
        </Component>
      );
    });
  }, [numPages, pageWidth, pageHeight]);

  function flipPrev() {
    const pf = flipBookRef.current;
    if (!pf) return;
    if (pf.pageFlip) { typeof pf.pageFlip === 'function' ? pf.pageFlip().flipPrev() : pf.pageFlip.flipPrev(); }
    else if (pf.getPageFlip) { pf.getPageFlip().flipPrev(); }
  }

  function flipNext() {
    const pf = flipBookRef.current;
    if (!pf) return;
    if (pf.pageFlip) { typeof pf.pageFlip === 'function' ? pf.pageFlip().flipNext() : pf.pageFlip.flipNext(); }
    else if (pf.getPageFlip) { pf.getPageFlip().flipNext(); }
  }

  // ─── Loading state ────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <Loader2 style={{ width: 48, height: 48, color: '#f83821', marginBottom: 16, animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 20, fontWeight: 'bold' }}>A carregar a revista...</p>
      </div>
    );
  }

  // ─── Error state ──────────────────────────────────────────────
  if (error || !magazine) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p style={{ fontSize: 20, color: '#f87171', marginBottom: 16 }}>{error || 'Revista não encontrada.'}</p>
        <button
          onClick={() => navigate('/revista')}
          style={{ backgroundColor: '#f83821', color: 'white', padding: '8px 24px', borderRadius: 8, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          Voltar à Galeria
        </button>
      </div>
    );
  }

  // ─── Reader ───────────────────────────────────────────────────
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#0a0a0a' }}>

      {/* Injected CSS */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .react-pdf__Page__canvas {
          display: block !important;
          max-width: 100%;
          height: auto !important;
        }
        .react-pdf__Page {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
        }
        .flip-book {
          margin: 0 auto;
        }
        .page, .page-cover {
          background: white !important;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', zIndex: 50,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
      }}>
        <button
          onClick={() => navigate('/revista')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
        >
          <X size={24} />
          <span style={{ fontWeight: 'bold', display: 'inline' }}>Sair do Leitor</span>
        </button>
        <div style={{ color: 'white', fontWeight: 'bold', letterSpacing: '0.1em', fontSize: 14, textTransform: 'uppercase' }}>
          {magazine.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          {numPages > 0 ? `Página ${currentPage + 1} de ${numPages}` : ''}
        </div>
      </div>

      {/* PDF Reader Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 64, bottom: 96, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        {pdfFile ? (
          <Document
            file={pdfFile}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            loading={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <Loader2 style={{ width: 32, height: 32, marginBottom: 8, animation: 'spin 1s linear infinite' }} />
                <p>A processar o documento PDF...</p>
              </div>
            }
          >
            {numPages > 0 && flipBookPages && (
              <HTMLFlipBook
                ref={flipBookRef}
                width={pageWidth}
                height={pageHeight}
                size="fixed"
                minWidth={315}
                maxWidth={2000}
                minHeight={400}
                maxHeight={2000}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={false}
                onFlip={(e: any) => setCurrentPage(e.data)}
                className="flip-book shadow-2xl"
                style={{ margin: '0 auto' }}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={false}
                startPage={0}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
                renderOnlyPageLengthChange={false}
                startZIndex={0}
                autoSize={true}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {flipBookPages}
              </HTMLFlipBook>
            )}
          </Document>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <Loader2 style={{ width: 32, height: 32, marginBottom: 8, animation: 'spin 1s linear infinite' }} />
            <p>A preparar ficheiro...</p>
          </div>
        )}
      </motion.div>

      {/* Bottom Controls */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 96,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
      }}>
        {numPages > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            padding: '12px 24px', borderRadius: 9999,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}>
            <button onClick={flipPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f83821')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}>
              <ChevronLeft size={28} />
            </button>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <input
                type="text"
                value={pageInput}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
                onKeyDown={handlePageInputKeyDown}
                style={{
                  width: 44,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 6,
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontSize: 16,
                  outline: 'none',
                  padding: '2px 0',
                  fontWeight: 'bold',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }}
              />
              <span style={{ opacity: 0.5 }}>/</span>
              <span>{numPages}</span>
            </div>
            <button onClick={flipNext} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f83821')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}>
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MagazineReaderPageWrapper() {
  return (
    <ErrorBoundary>
      <MagazineReaderPage />
    </ErrorBoundary>
  );
}

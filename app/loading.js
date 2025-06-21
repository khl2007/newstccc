
  import Skeleton from 'react-loading-skeleton';
    import 'react-loading-skeleton/dist/skeleton.css';


export default function Loading() {
  return (
  <div className="card-skeleton">
              <Skeleton height={200} />
              <Skeleton count={5} />
            </div>

)
}
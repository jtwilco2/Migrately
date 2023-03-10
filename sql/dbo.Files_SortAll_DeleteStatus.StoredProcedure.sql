/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10
		,@Deleted bit = 0
		,@SortBy nvarchar(100) = 'createdBy desc'

EXECUTE [dbo].[Files_SortAll_DeleteStatus]
		@PageIndex
		,@PageSize
		,@Deleted
		,@SortBy


***********************************************/
CREATE PROC [dbo].[Files_SortAll_DeleteStatus]
			@PageIndex int
			,@PageSize int
			,@Deleted bit
			,@SortBy nvarchar(100)
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
		  ,[F].[Name]
		  ,[Url]
		  ,[FileTypeId] as 'fileTypeId'
		  ,[FT].Name as 'FileTypeName'
		  ,[IsDeleted]
		  ,[CreatedBy]
		  ,U.FirstName
		  ,U.LastName
		  ,F.DateCreated
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[Files] as F 
		inner join [dbo].[FileTypes] as FT
			ON F.FileTypeId = FT.Id
		inner join [dbo].[Users] as U
			ON F.CreatedBy = u.Id
	  WHERE (isDeleted = @Deleted)

	  ORDER BY 
		CASE WHEN @SortBy = 'id asc' THEN f.Id END ASC,
		CASE WHEN @SortBy = 'id desc' THEN f.Id END DESC,
		
		CASE WHEN @SortBy = 'name asc' THEN f.Name END ASC,
		CASE WHEN @SortBy = 'name desc' THEN f.Name END DESC,
		
		CASE WHEN @SortBy = 'fileType asc' THEN ft.Name END ASC,
		CASE WHEN @SortBy = 'fileType desc' THEN ft.Name END DESC,
		
		CASE WHEN @SortBy = 'createdBy asc' THEN Concat(u.LastName, ' ', u.FirstName) END ASC,
		CASE WHEN @SortBy = 'createdBy desc' THEN Concat(u.LastName, ' ', u.FirstName) END DESC,
		
		CASE WHEN @SortBy = 'createdDate asc' THEN f.DateCreated END ASC,
		CASE WHEN @SortBy = 'createdDate desc' THEN f.DateCreated END DESC
		
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
